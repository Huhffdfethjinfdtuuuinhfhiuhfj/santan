const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'data', 'roles.json');
if (!fs.existsSync(path.dirname(file))) fs.mkdirSync(path.dirname(file), { recursive: true });
if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify({ owner: [], admins: [], mods: [] }));

module.exports = {
  isRole: (jid, role) => {
    const r = JSON.parse(fs.readFileSync(file));
    if (role === 'owner') return r.owner.includes(jid);
    if (role === 'admin') return r.owner.includes(jid) || r.admins.includes(jid);
    if (role === 'mod') return r.owner.includes(jid) || r.admins.includes(jid) || r.mods.includes(jid);
    return false;
  },
  addRole: (jid, role) => {
    const r = JSON.parse(fs.readFileSync(file));
    if (!r[role]) r[role]=[];
    if (!r[role].includes(jid)) r[role].push(jid);
    fs.writeFileSync(file, JSON.stringify(r,null,2));
  }
};
