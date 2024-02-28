const Image = require('../model/Images')

class ImageController {
    async multiple (req, res, next) {
        try {
            const images = req.files.map(file => ({
            
              url: file.filename
           
            }));
            
            const insertedImages = [];
            for (const image of images) {
                const newImage = new Image(image);
                await newImage.save();
                insertedImages.push(newImage);
            }
            
            if(insertedImages.length === images.length) {
                res.json({ success: 'Images uploaded successfully' });
            } else {
                res.json({ error: 'No images were uploaded' });
            }
          }
        catch (error) {
            console.error('Error uploading images:', error);
            res.status(500).json({ error: 'Error uploading images' });
          }
        
      
    }
    async single (req, res, next) {
        try {
            const newImage = new Image({data: req.file.filename});
            newImage.save()
                .then(rs => res.json({ success: 'Images uploaded successfully' }))
                .catch(err =>  res.json({ error: 'No images were uploaded' }))
            
          }
        catch (error) {
            console.error('Error uploading images:', error);
            res.status(500).json({ error: 'Error uploading images' });
          }
      
    }
}

module.exports = new ImageController