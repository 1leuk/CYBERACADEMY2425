const express = require("express"); //panggil library apa?
const app = express();
const PORT = 4000; //pakai port berapa?

// Middleware to parse JSON
app.use(express.json());

// Mock data
let groups = [
  {
    group_name: "Jabberwocky", //nama kelompoknya apa
    student1: { student_name: "Ipan", student_id: "100200300", student_class: "Telco 01" }, //data mahasiswa 1
    student2: { student_name: "Sayid", student_id: "100200301", student_class: "Telco 02" }, //data mahasiswa 2
    student3: { student_name: "Retno", student_id: "100200302", student_class: "Telco 03" }, //data mahasiswa 3
    student4: { student_name: "Eka", student_id: "100200303", student_class: "Sisfo 04" }, //data mahasiswa 4
  },
];

// Routes

// Get all groups
app.get("/groups", (req, res) => {
  res.json(groups); //variable kelompok yang akan ditampilkan
});

// Get a specific group by name
app.get("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" }); //apa response status data not found
  res.json(group);
});

// Add a new group
app.post("/groups", (req, res) => {
  const { group_name, student1, student2, student3, student4 } = req.body;

  if (!group_name) {
    return res.status(400).json({ error: "Group name is required" }); //apa response status bad request
  }

  const newGroup = { group_name, student1, student2, student3, student4 };
  groups.push(newGroup);
  res.status(201).json(newGroup);
});

// Update a group by name
app.put("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const { group_name, student1, student2, student3, student4 } = req.body;

  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" });

  if (group_name) group.group_name = group_name;
  if (student1) group.student1 = student1;
  if (student2) group.student2 = student2;
  if (student3) group.student3 = student3;
  if (student4) group.student4 = student4;

  res.json(group);
});

// Delete a group by name
app.delete("/groups/:group_name", (req, res) => {
    const groupName = req.params.group_name;
    const groupIndex = groups.findIndex((g) => g.group_name === groupName);
  
    if (groupIndex === -1) {
      return res.status(404).json({ error: "Group not found" });
    }
  
    // Remove the group from the array
    groups.splice(groupIndex, 1);
  
    res.status(200).json({
      message: `The Group "${groupName}" has been deleted successfully.`,
      remaining_groups: groups,
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});