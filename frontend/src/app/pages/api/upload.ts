// pages/api/upload.ts
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // Désactive le bodyParser de Next.js pour traiter les fichiers avec formidable
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("Request received at /api/upload");
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir; // Définit le dossier de téléchargement
  form.keepExtensions = true; // Garde l'extension du fichier original

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors du téléchargement' });
    }

    const file = files.file;
    const filePath = file.filepath;
    const newFilePath = path.join(uploadDir, file.originalFilename || 'image.jpg');

    fs.rename(filePath, newFilePath, (renameErr) => {
      if (renameErr) {
        return res.status(500).json({ error: 'Erreur lors de la sauvegarde de l\'image' });
      }

      const publicImageUrl = `/uploads/${path.basename(newFilePath)}`;
      return res.status(200).json({ url: publicImageUrl });
    });
  });
};

export default uploadHandler;
