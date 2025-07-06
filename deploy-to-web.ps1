Write-Host "🚀 Deploying Monopoly Deal Online Game..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Step 1: Push to GitHub
Write-Host "📤 Step 1: Pushing to GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Add deployment configuration - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin main

Write-Host "✅ Code pushed to GitHub!" -ForegroundColor Green

# Step 2: Instructions for Render.com
Write-Host "🔧 Step 2: Deploy Backend to Render.com" -ForegroundColor Yellow
Write-Host "1. Go to https://render.com and sign up/login" -ForegroundColor White
Write-Host "2. Click 'New' > 'Web Service'" -ForegroundColor White
Write-Host "3. Connect your GitHub repository" -ForegroundColor White
Write-Host "4. Use these settings:" -ForegroundColor White
Write-Host "   - Name: monopoly-deal-server" -ForegroundColor Gray
Write-Host "   - Environment: Node" -ForegroundColor Gray
Write-Host "   - Build Command: cd server && npm install" -ForegroundColor Gray
Write-Host "   - Start Command: cd server && npm start" -ForegroundColor Gray
Write-Host "   - Plan: Free" -ForegroundColor Gray
Write-Host "5. Add environment variables:" -ForegroundColor White
Write-Host "   - NODE_ENV=production" -ForegroundColor Gray
Write-Host "   - CLIENT_URL=https://sanjayravyy.github.io/MonopolyDealOnlineGame" -ForegroundColor Gray
Write-Host "6. Deploy the service" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "⚠️  IMPORTANT: Copy the Render URL when deployed!" -ForegroundColor Red
Write-Host "   Example: https://monopoly-deal-server.onrender.com" -ForegroundColor Gray

# Step 3: Deploy Frontend
Write-Host "🌐 Step 3: Deploy Frontend to GitHub Pages" -ForegroundColor Yellow
Write-Host "After backend is deployed, update the frontend:" -ForegroundColor White
Write-Host "1. Update client/.env with your Render URL" -ForegroundColor White
Write-Host "2. Run: cd client && npm run deploy" -ForegroundColor White

Write-Host "" -ForegroundColor White
Write-Host "🎉 Deployment Guide Complete!" -ForegroundColor Green
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Deploy backend on Render.com" -ForegroundColor White
Write-Host "2. Update frontend config with backend URL" -ForegroundColor White
Write-Host "3. Deploy frontend to GitHub Pages" -ForegroundColor White
Write-Host "4. Share the game link with friends!" -ForegroundColor White 