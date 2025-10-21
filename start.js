// start.js
const { execSync } = require("child_process");

function run(command) {
  console.log(`\n> Running: ${command}`);
  execSync(command, { stdio: "inherit", shell: true });
}

try {
  console.log("🏗️  Building Next.js app...");
  run("npm run build");

  console.log("🚀 Starting Next.js with PM2 (Windows safe mode)...");
  run('pm2 start node --name "nextjsmeroket" -- node_modules/next/dist/bin/next start');

  run("pm2 save");

  console.log("\n✅ Application is now running under PM2!");
  console.log("To view logs: pm2 logs nextjsmeroket");
  console.log("To stop it: pm2 stop nextjsmeroket");
  console.log("To restart: pm2 restart nextjsmeroket");
} catch (error) {
  console.error("\n❌ Failed to start app:", error.message);
  process.exit(1);
}
