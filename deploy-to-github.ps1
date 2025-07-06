# 🚀 Monopoly Deal - GitHub Pages Deployment Script
# Run this script to deploy your game to GitHub Pages

Write-Host "🎮 Monopoly Deal GitHub Pages Deployment" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "client\package.json")) {
    Write-Host "❌ Error: Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

# Step 1: Update package.json homepage URL
Write-Host "🔧 Step 1: Update GitHub username in package.json" -ForegroundColor Yellow
$githubUsername = Read-Host "Enter your GitHub username"

if ([string]::IsNullOrWhiteSpace($githubUsername)) {
    Write-Host "❌ GitHub username is required!" -ForegroundColor Red
    exit 1
}

# Update homepage URL in package.json
$packageJsonPath = "client\package.json"
$packageJson = Get-Content $packageJsonPath | ConvertFrom-Json
$packageJson.homepage = "https://$githubUsername.github.io/MonopolyDealOnlineGame"
$packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath

Write-Host "✅ Updated homepage URL to: https://$githubUsername.github.io/MonopolyDealOnlineGame" -ForegroundColor Green

# Step 2: Initialize git if not already done
Write-Host "🔧 Step 2: Initialize Git repository" -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists" -ForegroundColor Green
}

# Step 3: Add and commit changes
Write-Host "🔧 Step 3: Commit changes" -ForegroundColor Yellow
git add .
git commit -m "Add password protection and prepare for GitHub Pages deployment"

# Step 4: Add GitHub remote if not exists
Write-Host "🔧 Step 4: Setup GitHub remote" -ForegroundColor Yellow
$remoteUrl = "https://github.com/$githubUsername/MonopolyDealOnlineGame.git"

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "✅ Remote origin already exists: $existingRemote" -ForegroundColor Green
} else {
    git remote add origin $remoteUrl
    Write-Host "✅ Added remote origin: $remoteUrl" -ForegroundColor Green
}

# Step 5: Push to GitHub
Write-Host "🔧 Step 5: Push to GitHub" -ForegroundColor Yellow
Write-Host "📋 Make sure you've created the repository on GitHub: $remoteUrl" -ForegroundColor Cyan
$confirm = Read-Host "Have you created the repository on GitHub? (y/n)"

if ($confirm -eq "y" -or $confirm -eq "Y") {
    try {
        git branch -M main
        git push -u origin main
        Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Error pushing to GitHub. Make sure the repository exists and you have access." -ForegroundColor Red
        Write-Host "Repository URL: $remoteUrl" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "⏸️  Please create the repository on GitHub first, then run this script again." -ForegroundColor Yellow
    Write-Host "Repository URL: $remoteUrl" -ForegroundColor Cyan
    exit 0
}

# Step 6: Deploy to GitHub Pages
Write-Host "🔧 Step 6: Deploy to GitHub Pages" -ForegroundColor Yellow
Set-Location "client"

try {
    npm run deploy
    Write-Host "✅ Deployment to GitHub Pages successful!" -ForegroundColor Green
} catch {
    Write-Host "❌ Error deploying to GitHub Pages" -ForegroundColor Red
    Set-Location ".."
    exit 1
}

Set-Location ".."

# Step 7: Final instructions
Write-Host ""
Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Your game is now live at:" -ForegroundColor Yellow
Write-Host "   https://$githubUsername.github.io/MonopolyDealOnlineGame" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔑 Password for friends: monopoly2024" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to GitHub repository settings" -ForegroundColor White
Write-Host "2. Enable GitHub Pages (select gh-pages branch)" -ForegroundColor White
Write-Host "3. Wait 5-10 minutes for deployment" -ForegroundColor White
Write-Host "4. Share the URL and password with friends!" -ForegroundColor White
Write-Host ""
Write-Host "📱 Share this with friends:" -ForegroundColor Yellow
Write-Host "🎮 Join our private Monopoly Deal game!" -ForegroundColor Cyan
Write-Host "🌐 https://$githubUsername.github.io/MonopolyDealOnlineGame" -ForegroundColor Cyan
Write-Host "🔑 Password: monopoly2024" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Happy gaming!" -ForegroundColor Green 