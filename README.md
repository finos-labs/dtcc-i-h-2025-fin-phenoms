![badge-labs](https://user-images.githubusercontent.com/327285/230928932-7c75f8ed-e57b-41db-9fb7-a292a13a1e58.svg)

# DTCC AI Hackathon 2025: Empowering India's Innovators
The purpose of hackathon is to leverage AI and ML Technologies to address critical challenges in the financial markets. The overall goal is to progress industry through Innovation, Networking and by providing effective Solutions.

**Hackathon Key Dates** 
•	June 6th - Event invites will be sent to participants
•	June 9th - Hackathon Open
•	June 9th-11th - Team collaboration and Use Case development
•	June 12th - Team presentations & demos
•	June 16th - Winners Announcement

More Info - https://communications.dtcc.com/dtcc-ai-hackathon-registration-17810.html

Commit Early & Commit Often!!!

## Project Name
Financial Dashboard with AI Chat Assistant

### Project Details
This project is a financial dashboard with real-time market data visualization and an AI-powered chat assistant. The dashboard displays stock prices, economic indicators, and market news, while the AI chat assistant provides financial advice and answers questions about investments, market trends, and portfolio management.

Key features:
- Real-time stock price visualization
- Economic indicators dashboard
- AI-powered chat assistant for financial advice
- FDC3 integration for interoperability with other financial applications

### Team Information
Team Fin Phenoms - DTCC AI Hackathon 2025

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/dtcc-i-h-2025-fin-phenoms.git
cd dtcc-i-h-2025-fin-phenoms
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
VITE_AWS_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=your_access_key
VITE_AWS_SECRET_ACCESS_KEY=your_secret_key
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Production Build
To create a production build:
```bash
npm run build
# or
yarn build
```

To preview the production build locally:
```bash
npm run preview
# or
yarn preview
```

## AWS Integration

### AWS Bedrock Integration for AI Chat
The AI chat assistant is designed to work with AWS Bedrock for production use. Currently, it uses a mock implementation, but you can integrate it with AWS Bedrock by following these steps:

1. Set up AWS Bedrock in your AWS account
2. Update the `getAIResponse` function in `src/components/AIChat.jsx` to use AWS Bedrock:

```javascript
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// Initialize the Bedrock client
const bedrockClient = new BedrockRuntimeClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

// Update the getAIResponse function
const getAIResponse = async (userMessage) => {
  setIsTyping(true);

  try {
    const prompt = `Human: ${userMessage}\n\nAssistant:`;

    const params = {
      modelId: "anthropic.claude-v2", // or another model of your choice
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: prompt,
        max_tokens_to_sample: 500,
        temperature: 0.7,
        top_p: 0.9,
      }),
    };

    const command = new InvokeModelCommand(params);
    const response = await bedrockClient.send(command);

    // Parse the response
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const aiResponse = responseBody.completion.trim();

    setIsTyping(false);
    return aiResponse;
  } catch (error) {
    console.error("Error calling AWS Bedrock:", error);
    setIsTyping(false);
    return "I'm sorry, I encountered an error processing your request. Please try again later.";
  }
};
```

## AWS Deployment Guide for Beginners

This guide will help you deploy the application to AWS using Amplify, which is a beginner-friendly way to deploy web applications.

### Prerequisites
- An AWS account
- AWS CLI installed and configured
- Git repository with your project (GitHub, GitLab, BitBucket, etc.)

### Deployment Steps

#### 1. Prepare Your Application for Deployment

Make sure your application is ready for production:
```bash
npm run build
```

This will create a `dist` folder with your production-ready application.

#### 2. Deploy with AWS Amplify Console (Easiest Method)

1. **Sign in to the AWS Management Console**
   - Go to https://aws.amazon.com/console/
   - Sign in with your AWS account

2. **Open AWS Amplify**
   - Search for "Amplify" in the search bar
   - Select "AWS Amplify" from the results

3. **Create a New App**
   - Click "New app" in the top-right corner
   - Select "Host web app"

4. **Connect to Your Git Repository**
   - Choose your Git provider (GitHub, BitBucket, GitLab, etc.)
   - Authorize AWS Amplify to access your repositories
   - Select your repository and the branch you want to deploy

5. **Configure Build Settings**
   - Amplify will automatically detect that you're using Vite
   - The default build settings should work, but you can customize them if needed
   - Here's a sample build specification:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

6. **Configure Environment Variables**
   - Add your environment variables in the "Environment variables" section
   - Include all the variables from your `.env` file (except sensitive ones like API keys)
   - For sensitive variables, use AWS Systems Manager Parameter Store

7. **Review and Deploy**
   - Review your settings
   - Click "Save and deploy"

8. **Wait for Deployment**
   - Amplify will build and deploy your application
   - This may take a few minutes

9. **Access Your Application**
   - Once deployment is complete, you can access your application at the provided URL
   - Amplify provides a default domain (e.g., https://main.d1a2b3c4.amplifyapp.com)
   - You can also configure a custom domain in the "Domain management" section

#### 3. Alternative: Deploy to Amazon S3 with CloudFront

If you prefer more control or want to learn about other AWS services, you can deploy your application to Amazon S3 with CloudFront:

1. **Create an S3 Bucket**
   ```bash
   aws s3 mb s3://your-app-name
   ```

2. **Configure the Bucket for Static Website Hosting**
   ```bash
   aws s3 website s3://your-app-name --index-document index.html --error-document index.html
   ```

3. **Set Bucket Policy for Public Access**
   Create a file named `bucket-policy.json`:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-app-name/*"
       }
     ]
   }
   ```

   Apply the policy:
   ```bash
   aws s3api put-bucket-policy --bucket your-app-name --policy file://bucket-policy.json
   ```

4. **Upload Your Application**
   ```bash
   aws s3 sync dist/ s3://your-app-name
   ```

5. **Create a CloudFront Distribution**
   - Go to the CloudFront console
   - Click "Create Distribution"
   - For "Origin Domain Name", select your S3 bucket
   - Configure other settings as needed
   - Click "Create Distribution"

6. **Update DNS (Optional)**
   - If you have a custom domain, update your DNS settings to point to your CloudFront distribution

#### 4. Setting Up AWS Bedrock for AI Chat

1. **Enable AWS Bedrock**
   - Go to the AWS Bedrock console
   - Request access to the models you want to use (e.g., Claude, GPT-4)
   - Wait for approval (usually takes a few hours to a day)

2. **Create IAM Role for Bedrock Access**
   - Go to the IAM console
   - Create a new role with the `AmazonBedrockFullAccess` policy
   - Note the role ARN for later use

3. **Update Your Application**
   - Update your `.env` file with the AWS credentials and region
   - Deploy the updated application

4. **Test the AI Chat**
   - Open your deployed application
   - Test the AI chat functionality to ensure it's working with AWS Bedrock

### Troubleshooting

- **CORS Issues**: If you encounter CORS issues when calling AWS services, you may need to configure CORS settings for your API Gateway or other services.
- **Authentication Errors**: Make sure your AWS credentials are correctly set up and have the necessary permissions.
- **Build Errors**: Check your build logs in AWS Amplify to identify and fix any build errors.
- **Routing Issues**: For single-page applications (SPAs), configure your CloudFront distribution to redirect all requests to `index.html`.

### Team Information


## Using DCO to sign your commits

**All commits** must be signed with a DCO signature to avoid being flagged by the DCO Bot. This means that your commit log message must contain a line that looks like the following one, with your actual name and email address:

```
Signed-off-by: John Doe <john.doe@example.com>
```

Adding the `-s` flag to your `git commit` will add that line automatically. You can also add it manually as part of your commit log message or add it afterwards with `git commit --amend -s`.

See [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for more information

### Helpful DCO Resources
- [Git Tools - Signing Your Work](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work)
- [Signing commits
](https://docs.github.com/en/github/authenticating-to-github/signing-commits)


## License

Copyright 2025 FINOS

Distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

SPDX-License-Identifier: [Apache-2.0](https://spdx.org/licenses/Apache-2.0)
