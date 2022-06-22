import os from 'os';

export default function getLocalNetworkAddresses(): Array<string> {
  const nets = os.networkInterfaces();
  const ips: Array<string> = [];

  for (const name in nets) {
    if (nets[name]) {
      for (const net of nets?.[name] || []) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
        if (net.family === familyV4Value && !net.internal) {
          ips.push(net.address);
        }
      }
    }
  }

  return ips;
}
