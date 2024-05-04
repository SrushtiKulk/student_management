// // server.js
// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = 3000; // You can change this to any port you prefer

// // MongoDB connection
// mongoose.connect('mongodb://localhost/student', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB connected');
// }).catch((err) => {
//   console.error('MongoDB connection error:', err);
// });

// // Express middleware
// app.use(express.json());

// // Define schema and model for studentmarks collection
// const studentMarksSchema = new mongoose.Schema({
//   Name: String,
//   Roll_No: Number,
//   WAD_Marks: Number,
//   CC_Marks: Number,
//   DSBDA_Marks: Number,
//   CNS_Marks: Number,
//   AI_marks: Number
// });

// const StudentMarks = mongoose.model('StudentMarks', studentMarksSchema);

// // Array of documents to insert
// const documents = [
//   { Name: 'John', Roll_No: 1, WAD_Marks: 85, CC_Marks: 75, DSBDA_Marks: 90, CNS_Marks: 80, AI_marks: 95 },
//   { Name: 'Alice', Roll_No: 2, WAD_Marks: 80, CC_Marks: 70, DSBDA_Marks: 85, CNS_Marks: 75, AI_marks: 90 },
//   { Name: 'Ale', Roll_No: 3, WAD_Marks: 30, CC_Marks: 20, DSBDA_Marks: 85, CNS_Marks: 75, AI_marks: 90 }
//   // Add more documents as needed
// ];

// // Insert documents into the MongoDB collection
// (async () => {
//   try {
//     await StudentMarks.insertMany(documents);
//     console.log('Documents inserted successfully');
//   } catch (error) {
//     console.error('Error inserting documents:', error);
//   }
// })();


// // Routes

// app.get('/', (req, res) => {
//     res.send('Welcome to the Student Management System');
//   });  

// //D]
// // Route to display total count of documents and list all documents
// app.get('/listDocuments', async (req, res) => {
//   try {
//     const count = await StudentMarks.countDocuments();
//     const documents = await StudentMarks.find();
//     res.json({ count, documents });
//   } catch (error) {
//     res.status(500).send('Error listing documents');
//   }
// });

// //E]
// app.get('/studentsWithMoreThan20MarksInDSBDA', async (req, res) => {
//     try {
//       const students = await StudentMarks.find({ DSBDA_Marks: { $gt: 20 } }, 'Name'); // Find students with DSBDA marks > 20 and project only the Name field
//       res.json(students);
//     } catch (error) {
//       res.status(500).send('Error fetching students');
//     }
//   });

// //F]

// fetch('http://localhost:3000/updateMarks/Alice', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({}) // Empty payload since we're not sending any data
// })
// .then(response => {
//   if (response.ok) {
//     return response.text();
//   }
//   throw new Error('Error updating marks');
// })
// .then(data => {
//   console.log(data); // Output: Marks updated successfully for Alice
// })
// .catch(error => {
//   console.error('Error:', error.message);
// });


// app.put('/updateMarks/:name', async (req, res) => {
//     const { name } = req.params;
//     try {
//       // Find the student by name and update their marks by 10
//       await StudentMarks.updateOne({ Name: name }, {
//         $inc: {
//           WAD_Marks: 10,
//           CC_Marks: 10,
//           DSBDA_Marks: 10,
//           CNS_Marks: 10,
//           AI_marks: 10
//         }
//       });
//       res.send(`Marks updated successfully for ${name}`);
//     } catch (error) {
//       res.status(500).send(`Error updating marks for ${name}`);
//     }
//   });

//   //G]
//   // Route to list the names of students who got more than 25 marks in all subjects
// app.get('/studentsWithMoreThan25MarksInAllSubjects', async (req, res) => {
//     try {
//       // Find students with marks greater than 25 in all subjects
//       const students = await StudentMarks.find({
//         WAD_Marks: { $gt: 25 },
//         CC_Marks: { $gt: 25 },
//         DSBDA_Marks: { $gt: 25 },
//         CNS_Marks: { $gt: 25 },
//         AI_marks: { $gt: 25 }
//       }, 'Name'); // Project only the Name field
//       res.json(students);
//     } catch (error) {
//       res.status(500).send('Error fetching students');
//     }
//   });

// //h]
// // Route to list the names of students who got less than 40 marks in both Maths and Science
// app.get('/studentsWithLessThan40MarksInWADAndCC', async (req, res) => {
//     try {
//       // Find students with marks less than 40 in both WAD and CC
//       const students = await StudentMarks.find({
//         WAD_Marks: { $lt: 40 },
//         CC_Marks: { $lt: 40 }
//       }, 'Name'); // Project only the Name field
//       res.json(students);
//     } catch (error) {
//       res.status(500).send('Error fetching students');
//     }
//   });
  
//   //i]
//   // Route to remove the document for the student named "John" from the collection

//   fetch('http://localhost:3000/removeJohnDocument', {
//   method: 'DELETE'
// })
// .then(response => {
//   if (response.ok) {
//     return response.text();
//   }
//   throw new Error('Error removing John document');
// })
// .then(data => {
//   console.log(data); // Output: Document for John removed successfully
// })
// .catch(error => {
//   console.error('Error:', error.message);
// });

// app.delete('/removeJohnDocument', async (req, res) => {
//     try {
//       // Find and remove the document for the student named "John"
//       const result = await StudentMarks.deleteOne({ Name: 'John' });
//       if (result.deletedCount === 1) {
//         res.send('Document for John removed successfully');
//       } else {
//         res.send('Document for John not found');
//       }
//     } catch (error) {
//       res.status(500).send('Error removing document for John');
//     }
//   });
  
// //j]
// // Route to render HTML page with student data
// app.get('/display', async (req, res) => {
//     try {
//       const students = await StudentMarks.find();
//       res.render('index', { students });
//     } catch (error) {
//       res.status(500).send('Error fetching students');
//     }
//   });
  
//   // Set the view engine to render HTML files
//   app.engine('html', require('ejs').renderFile);
//   app.set('view engine', 'html');
  

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT =3000; // You can change this to any port you prefer

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
mongoose.connect('mongodb://localhost/student', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Express middleware
app.use(express.json());

// Define schema and model for studentmarks collection
const studentMarksSchema = new mongoose.Schema({
  Name: String,
  Roll_No: Number,
  WAD_Marks: Number,
  CC_Marks: Number,
  DSBDA_Marks: Number,
  CNS_Marks: Number,
  AI_marks: Number
});

const StudentMarks = mongoose.model('StudentMarks', studentMarksSchema);

// Array of documents to insert
const documents = [
  { Name: 'John', Roll_No: 1, WAD_Marks: 85, CC_Marks: 75, DSBDA_Marks: 90, CNS_Marks: 80, AI_marks: 95 },
  { Name: 'Alice', Roll_No: 2, WAD_Marks: 80, CC_Marks: 70, DSBDA_Marks: 85, CNS_Marks: 75, AI_marks: 90 },
  { Name: 'Ale', Roll_No: 3, WAD_Marks: 30, CC_Marks: 20, DSBDA_Marks: 85, CNS_Marks: 75, AI_marks: 90 }
  // Add more documents as needed
];

// Insert documents into the MongoDB collection
(async () => {
  try {
    await StudentMarks.insertMany(documents);
    console.log('Documents inserted successfully');
  } catch (error) {
    console.error('Error inserting documents:', error);
  }
})();


// Routes

app.get('/', (req, res) => {
    res.send('Welcome to the Student Management System');
  });  

//D]
// Route to display total count of documents and list all documents
app.get('/listDocuments', async (req, res) => {
  try {
    const count = await StudentMarks.countDocuments();
    const documents = await StudentMarks.find();
    res.json({ count, documents });
  } catch (error) {
    res.status(500).send('Error listing documents');
  }
});

//E]
app.get('/studentsWithMoreThan20MarksInDSBDA', async (req, res) => {
    try {
      const students = await StudentMarks.find({ DSBDA_Marks: { $gt: 20 } }, 'Name'); // Find students with DSBDA marks > 20 and project only the Name field
      res.json(students);
    } catch (error) {
      res.status(500).send('Error fetching students');
    }
  });

//F]

fetch('http://localhost:3000/updateMarks/Alice', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({}) // Empty payload since we're not sending any data
})
.then(response => {
  if (response.ok) {
    return response.text();
  }
  throw new Error('Error updating marks');
})
.then(data => {
  console.log(data); // Output: Marks updated successfully for Alice
})
.catch(error => {
  console.error('Error:', error.message);
});


app.put('/updateMarks/:name', async (req, res) => {
    const { name } = req.params;
    try {
      // Find the student by name and update their marks by 10
      await StudentMarks.updateOne({ Name: name }, {
        $inc: {
          WAD_Marks: 10,
          CC_Marks: 10,
          DSBDA_Marks: 10,
          CNS_Marks: 10,
          AI_marks: 10
        }
      });
      res.send(`Marks updated successfully for ${name}`);
    } catch (error) {
      res.status(500).send(`Error updating marks for ${name}`);
    }
  });

  //G]
  // Route to list the names of students who got more than 25 marks in all subjects
app.get('/studentsWithMoreThan25MarksInAllSubjects', async (req, res) => {
    try {
      // Find students with marks greater than 25 in all subjects
      const students = await StudentMarks.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_marks: { $gt: 25 }
      }, 'Name'); // Project only the Name field
      res.json(students);
    } catch (error) {
      res.status(500).send('Error fetching students');
    }
  });

//h]
// Route to list the names of students who got less than 40 marks in both Maths and Science
app.get('/studentsWithLessThan40MarksInWADAndCC', async (req, res) => {
    try {
      // Find students with marks less than 40 in both WAD and CC
      const students = await StudentMarks.find({
        WAD_Marks: { $lt: 40 },
        CC_Marks: { $lt: 40 }
      }, 'Name'); // Project only the Name field
      res.json(students);
    } catch (error) {
      res.status(500).send('Error fetching students');
    }
  });
  
  //i]
  // Route to remove the document for the student named "John" from the collection

  fetch('http://localhost:3000/removeJohnDocument', {
  method: 'DELETE'
})
.then(response => {
  if (response.ok) {
    return response.text();
  }
  throw new Error('Error removing John document');
})
.then(data => {
  console.log(data); // Output: Document for John removed successfully
})
.catch(error => {
  console.error('Error:', error.message);
});

app.delete('/removeJohnDocument', async (req, res) => {
    try {
      // Find and remove the document for the student named "John"
      const result = await StudentMarks.deleteOne({ Name: 'John' });
      if (result.deletedCount === 1) {
        res.send('Document for John removed successfully');
      } else {
        res.send('Document for John not found');
      }
    } catch (error) {
      res.status(500).send('Error removing document for John');
    }
  });
  
// //j]
// // Route to render HTML page with student data
// app.get('/display', async (req, res) => {
//     try {
//       const students = await StudentMarks.find();
//       res.render('index', { students });
//     } catch (error) {
//       res.status(500).send('Error fetching students');
//     }
//   });
  
app.get("/displayAllStudentsInTable", async function (request, response) {
  try {
      const students = await StudentMarks.find();

      // Creating table view for browser
      let html = "<table border=1 style='border-collapse: collapse'>"; // Style tag is used to avoid double border on table

      // Creating headers
      html += `<tr>
          <th>Name</th>
          <th>Roll_No</th>
          <th>WAD_Marks</th>
          <th>CC_Marks</th>
          <th>DSBDA_Marks</th>
          <th>CNS_Marks</th>
          <th>AI_Marks</th>
      </tr>`;

      // Iterating through students array and creating table rows
      students.forEach(function (student) {
          html += "<tr>";
          html += "<td>" + student.Name + "</td>";
          html += "<td>" + student.Roll_No + "</td>";
          html += "<td>" + student.WAD_Marks + "</td>";
          html += "<td>" + student.CC_Marks + "</td>";
          html += "<td>" + student.DSBDA_Marks + "</td>";
          html += "<td>" + student.CNS_Marks + "</td>";
          html += "<td>" + student.AI_marks + "</td>";
          html += "</tr>";
      });

      html += "</table>";

      response.send(html);
  } catch (error) {
      console.error("Error fetching and displaying students:", error);
      response.status(500).send("Error fetching and displaying students");
  }
});

  // Set the view engine to render HTML files
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});