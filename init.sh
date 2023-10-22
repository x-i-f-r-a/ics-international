cd jain;
pm2 stop index.js;
cd;
git clone https://github.com/x-i-f-r-a/jain.git;
cd jain;
pm2 restart index.js;
systemctl restart nginx;
echo "\nConfiguration done and server restarted" 
