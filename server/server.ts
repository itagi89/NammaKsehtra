import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// // Initialize Prisma Client
export const prisma = new PrismaClient();

// // Middleware
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Your Next.js frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));
// console.log('Type of zillaPanchayatRoutes:', typeof zillaPanchayatRoutes);
//test

//onst routerToUse = testRouter();
// app.use('/api/zilla-panchayat', routerToUse);
// // Routes
app.get('/zilla-panchayat', async (req, res) => {
  try {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 25;
  const skip = (page - 1) * limit;
  
  const [records,total] = await Promise.all([prisma.ZilaPanchayat.findMany({
    skip: skip,
    take: limit,
  }),prisma.ZilaPanchayat.count()]);
  console.log(records.length)
  return res.status(200).json({records,total});
}
catch (error) {
  res.status(500).json({ error: 'Failed to fetch records' });
}
});

// // Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

//create
app.post('/api/zilla-panchayat', async (req, res) => {
  try {
    console.log('request received')
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: "Name and description are required" });
    }

    const newPanchayat = await prisma.ZilaPanchayat.create({
      data: { name, description },
    });

    res.status(201).json(newPanchayat);
  } catch (error) {
    console.error("Error creating Zilla Panchayat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//edit
app.put('/api/zilla-panchayat/:id', async (req, res) => {
  try {
    console.log('request received')
    const { name, description } = req.body;
    const {id} = req.params;

    if (!name || !description) {
      return res.status(400).json({ error: "Name and description are required" });
    }

    const existingItem = await prisma.ZilaPanchayat.findUnique({
      where: { id: id },
    });
    if(!existingItem){
      return res.status(404).json({ error: "Zilla Panchayat not found" });
    }
    
    const updatedZillaPanchayat = await prisma.ZilaPanchayat.update({
      where:{id:id},
      data: { name, description },
    });

    res.status(201).json(updatedZillaPanchayat);
  } catch (error) {
    console.error("Error updating Zilla Panchayat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete('/api/zilla-panchayat/:id', async (req, res) => {
  try {
    console.log('delete request received')
    const {id} = req.params;

    const existingItem = await prisma.ZilaPanchayat.findUnique({
      where: { id: id },
    });
    if(!existingItem){
      return res.status(404).json({ error: "Zilla Panchayat not found" });
    }
    
    const updatedZillaPanchayat = await prisma.ZilaPanchayat.delete({
      where:{id:id},
    });

    res.status(201).json(updatedZillaPanchayat);
  } catch (error) {
    console.error("Error updating Zilla Panchayat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});