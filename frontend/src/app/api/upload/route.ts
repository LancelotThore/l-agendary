// // pages/api/upload.ts
// import fs from 'fs';
// import path from 'path';
// import formidable from 'formidable';
// import { NextApiRequest, NextApiResponse } from 'next';

// export const config = {
//   api: {
//     bodyParser: false, // Désactive le bodyParser de Next.js pour traiter les fichiers avec formidable
//   },
// };

// const uploadDir = path.join(process.cwd(), 'public/uploads');

// const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   console.log("Request received at /api/upload");
//   const form = new formidable.IncomingForm();
//   form.uploadDir = uploadDir; // Définit le dossier de téléchargement
//   form.keepExtensions = true; // Garde l'extension du fichier original

//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Erreur lors du téléchargement' });
//     }

//     const file = files.file;
//     const filePath = file.filepath;
//     const newFilePath = path.join(uploadDir, file.originalFilename || 'image.jpg');

//     fs.rename(filePath, newFilePath, (renameErr) => {
//       if (renameErr) {
//         return res.status(500).json({ error: 'Erreur lors de la sauvegarde de l\'image' });
//       }

//       const publicImageUrl = `/uploads/${path.basename(newFilePath)}`;
//       return res.status(200).json({ url: publicImageUrl });
//     });
//   });
// };

// export default uploadHandler;

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';
import { Readable } from 'stream';
import { IncomingMessage } from 'http';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads/profile_pictures');

export async function POST(req: NextRequest) {
  // console.log('--- POST /api/upload received ---');

  if (!fs.existsSync(uploadDir)) {
    // console.log('Creating upload directory:', uploadDir);
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  // Convertir `NextRequest` en `IncomingMessage` pour `formidable`
  const httpReq = transformNextRequest(req);

  return new Promise((resolve) => {
    form.parse(httpReq, (err, fields, files) => {
      if (err) {
        // console.error('Error while parsing form:', err);
        resolve(NextResponse.json({ error: 'Erreur lors du téléchargement' }, { status: 500 }));
        return;
      }

      console.log('Fields:', fields);
      console.log('Files:', files);

      const file = files.file ? files.file[0] : null;
      if (!file) {
        // console.error('No file uploaded!');
        resolve(NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 }));
        return;
      }

      // Générer un nom unique basé sur le timestamp et un identifiant aléatoire
      const timestamp = Date.now(); // Timestamp actuel
      const randomSuffix = Math.floor(Math.random() * 1e6); // Suffixe aléatoire (jusqu'à 1 million)
      const fileExtension = path.extname(file.originalFilename || 'image.jpg'); // Extension du fichier
      const uniqueFileName = `${timestamp}_${randomSuffix}${fileExtension}`; // Nom unique basé sur le timestamp et un suffixe

      // Chemin complet pour le nouveau fichier
      const newFilePath = path.join(uploadDir, uniqueFileName);
      console.log('Renaming file from:', file.filepath, 'to:', newFilePath);

      fs.rename(file.filepath, newFilePath, (renameErr) => {
        if (renameErr) {
          // console.error('Error renaming file:', renameErr);
          resolve(NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 }));
        } else {
          const publicImageUrl = `/uploads/profile_pictures/${uniqueFileName}`;
          console.log('File uploaded successfully:', publicImageUrl);
          resolve(
            NextResponse.json(
              {
                message: 'Téléchargement réussi',
                fileName: uniqueFileName, // Nom du fichier généré
                url: publicImageUrl, // URL publique de l'image
              },
              { status: 200 }
            )
          );
        }
      });
    });
  });
}

// Fonction pour convertir `NextRequest` en `IncomingMessage`
function transformNextRequest(nextRequest: NextRequest): IncomingMessage {
  const readable = Readable.from(nextRequest.body ?? []);
  const req = readable as unknown as IncomingMessage;

  req.headers = Object.fromEntries(nextRequest.headers.entries());
  req.method = nextRequest.method || 'POST';
  req.url = nextRequest.url || '';

  return req;
}








