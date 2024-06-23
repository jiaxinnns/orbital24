// ably.js
import Ably from "ably";

const ably = new Ably.Realtime(import.meta.env.VITE_APP_ABLY_API_KEY);

export default ably;
