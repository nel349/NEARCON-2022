import { networkInterfaces } from 'os';

export const heyo = () => {
    const nets = networkInterfaces();
    const results = Object.create(null); // Or just '{}', an empty object
    for (const name of Object.keys(nets)) {
    const nete = nets[name];
     if (nets == undefined || nete == undefined) {
        return
     }
     
      for (const net of nete) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          results[name].push(net.address);
        }
      }
    }
    return results;
}


const ip = heyo().en0
console.log("this heyo: " + ip)
