const axios = require('axios');
const fs = require('fs');
const pdf = require('pdf-parse');

const fileId = '1P2kmyulnTIu4UzbjOoTyN9TwjRm9haFJ';
const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

async function downloadAndParse() {
    try {
        console.log('Downloading...');
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'arraybuffer'
        });
        
        fs.writeFileSync('paper.pdf', response.data);
        console.log('Downloaded successfully. Parsing...');
        
        let dataBuffer = fs.readFileSync('paper.pdf');
        
        pdf(dataBuffer).then(function(data) {
            console.log('Pages:', data.numpages);
            const text = data.text;
            fs.writeFileSync('parsed_text.txt', text);
            console.log('Parsed successfully. Wrote to parsed_text.txt');
        }).catch(err => {
            console.error('PDF Parse error. The file might be an HTML warning page instead of a PDF.');
            fs.writeFileSync('error_dump.txt', response.data);
        });
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

downloadAndParse();
