print("Started Adding the Users.");
db = db.getSiblingDB("admin");
db.createUser({
  user: "budgie-admin",
  pwd: "P4sSw0rd",
  roles: [{ role: "readWrite", db: "budgie" }],
});
print("End Adding the User Roles.");
