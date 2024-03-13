import SftpClient from 'ssh2-sftp-client';
import express from 'express';
const client = new SftpClient();
const app = express();

client.connect({
    host: 'secureftp.papyrus.com',
    port: 22,
    username: 'sapftp_4PX',
    password: 'KK62*0BdT*f1',
    algorithms: {
        kex: [
            "diffie-hellman-group1-sha1",
            "ecdh-sha2-nistp256",
            "ecdh-sha2-nistp384",
            "ecdh-sha2-nistp521",
            "diffie-hellman-group-exchange-sha256",
            "diffie-hellman-group14-sha1"
        ],
        cipher: [
            "3des-cbc",
            "aes128-ctr",
            "aes192-ctr",
            "aes256-ctr",
            "aes128-gcm",
            "aes128-gcm@openssh.com",
            "aes256-gcm",
            "aes256-gcm@openssh.com"
        ],
        serverHostKey: [
            "ssh-rsa",
            "ecdsa-sha2-nistp256",
            "ecdsa-sha2-nistp384",
            "ecdsa-sha2-nistp521"
        ],
        hmac: [
            "hmac-sha2-256",
            "hmac-sha2-512",
            "hmac-sha1"
        ]
    }
}).then(() => {
    client.list('/').then((data) => {
        const folders = data.filter((item) => item.type === 'd');
        console.log('Folders on server:', folders.map((folder) => folder.name));
    }).catch((err) => {
        console.error('Error listing folders:', err);
    });
}).catch((err) => {
    console.error('Error connecting to SFTP server:', err);
});

const port = 5444;

app.listen(port, () => {
    console.log(`Server running on port ${ port}`);
});
