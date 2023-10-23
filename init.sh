cd ics-international;
pm2 stop index.js;
cd;
git clone https://github.com/x-i-f-r-a/ics-international.git;
cd ics-international;
pm2 restart index.js;
systemctl restart nginx;
echo "\nConfiguration done and server restarted" 
