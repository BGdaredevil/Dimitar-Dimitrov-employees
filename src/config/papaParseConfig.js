import { RECORD_SEP, UNIT_SEP } from "papaparse";

const config = {
  delimiter: "", // auto-detect
  newline: "", // auto-detect
  quoteChar: '"',
  escapeChar: '"',
  header: true,
  transformHeader: undefined,
  dynamicTyping: true,
  preview: 0,
  encoding: "",
  worker: false,
  comments: false,
  step: undefined,
  complete: undefined,
  error: undefined,
  download: false,
  downloadRequestHeaders: undefined,
  downloadRequestBody: undefined,
  skipEmptyLines: false,
  chunk: undefined,
  chunkSize: undefined,
  fastMode: undefined,
  beforeFirstChunk: undefined,
  withCredentials: undefined,
  delimitersToGuess: [",", "\t", "|", ";", RECORD_SEP, UNIT_SEP],
};

export default config;
