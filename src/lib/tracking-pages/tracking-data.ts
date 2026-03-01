import Papa from "papaparse";

export type TrackingEvent = {
  orderId: number;
  dateTime: string;
  status: string;
  isLastStatus: boolean;
};

export type OrderData = {
  orderId: number;
  awb: string;
  date: string;
  origin: string;
  destination: string;
  vendorName: string;
};

const BUILD_SPREADSHEET_URL = (gid: string) =>
  `https://docs.google.com/spreadsheets/d/1wt-qVWM63GwygJBqdYRpFurXSnfT55i7Pj7aIRYcKUE/export?format=csv&gid=${gid}`;
const ORDERS_CSV_URL = BUILD_SPREADSHEET_URL("0");
const TRACKS_CSV_URL = BUILD_SPREADSHEET_URL("1954461322");

export async function fetchTrackingData(
  awb: string
): Promise<{ order: OrderData | null; events: TrackingEvent[] }> {
  try {
    const targetAwb = awb.trim().toLowerCase();

    // Fetch Orders
    const ordersRes = await fetch(ORDERS_CSV_URL);
    if (!ordersRes.ok) {
      throw new Error(`Failed to fetch orders: ${ordersRes.statusText}`);
    }
    const ordersCsv = await ordersRes.text();
    const ordersResult = Papa.parse<Record<string, string>>(ordersCsv, {
      header: true,
      skipEmptyLines: true,
    });

    let order: OrderData | null = null;
    let orderId: number | null = null;

    for (const row of ordersResult.data) {
      if (row.AWB?.trim().toLowerCase() === targetAwb) {
        orderId = Number(row["Order ID"]);
        order = {
          orderId,
          awb: row.AWB,
          date: row.Date,
          origin: row.Origin,
          destination: row.Destination,
          vendorName: row["Vendor Name"],
        };
        break;
      }
    }

    if (!order || orderId === null) {
      return { order: null, events: [] };
    }

    // Fetch Tracks
    const tracksRes = await fetch(TRACKS_CSV_URL);
    if (!tracksRes.ok) {
      throw new Error(`Failed to fetch tracks: ${tracksRes.statusText}`);
    }
    const tracksCsv = await tracksRes.text();
    const tracksResult = Papa.parse<Record<string, string>>(tracksCsv, {
      header: true,
      skipEmptyLines: true,
    });

    const events: TrackingEvent[] = [];

    for (const row of tracksResult.data) {
      if (Number(row["Order ID"]) === orderId) {
        events.push({
          orderId,
          dateTime: row["Date and Time"],
          status: row.Status,
          isLastStatus: row["Is Last Status"]?.trim().toUpperCase() === "TRUE",
        });
      }
    }

    // Sort descending by date/time
    events.sort((a, b) => {
      const parseDate = (str: string) => {
        if (!str?.includes(" ")) {
          return new Date(0);
        }
        const [datePart, timePart] = str.split(" ");
        const [day, month, year] = datePart.split("/");
        return new Date(`${year}-${month}-${day}T${timePart}`);
      };
      return parseDate(b.dateTime).getTime() - parseDate(a.dateTime).getTime();
    });

    return { order, events };
  } catch (error) {
    console.error("Error fetching tracking data:", error);
    return { order: null, events: [] };
  }
}
