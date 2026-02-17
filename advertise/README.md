# Advertise Microservice

This microservice provides advertisement information for the FlixTube application, displaying links to three major e-commerce platforms:

- **Shopee** - Online Shopping Platform
- **Lazada** - Leading eCommerce Platform in Southeast Asia
- **Kaidee** - Thailand's Largest Marketplace

## Features

- RESTful API endpoint `/advertisements` that returns advertisement data
- Static file serving for advertisement images
- Health check endpoint at `/health`
- Responsive web display through the gateway service

## API Endpoints

### GET /advertisements

Returns a JSON array of advertisements with the following structure:

```json
{
  "advertisements": [
    {
      "id": 1,
      "name": "Shopee",
      "description": "Shopee - Online Shopping Platform",
      "imageUrl": "/images/shopee.png",
      "websiteUrl": "https://shopee.co.th",
      "featured": true
    }
  ]
}
```

### GET /health

Returns service health status:

```json
{
  "status": "OK",
  "service": "advertise"
}
```

## Directory Structure

```
advertise/
├── package.json
├── Dockerfile-dev
├── Dockerfile-prod
├── src/
│   └── index.js
└── public/
    └── images/
        ├── shopee.png
        ├── lazada.png
        └── kaidee.png
```

## Setup and Deployment

### Local Development with Docker Compose

1. **Replace placeholder images**: Add actual PNG images for the three e-commerce platforms in `/advertise/public/images/`
   - `shopee.png` - Shopee logo
   - `lazada.png` - Lazada logo
   - `kaidee.png` - Kaidee logo

2. **Start all services**:

   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Main application: http://localhost:4000
   - Advertise service directly: http://localhost:4007

### Kubernetes Deployment

#### Prerequisites

- Configure your container registry: `export CONTAINER_REGISTRY=<your-registry>`
- Ensure kubectl is configured for your target cluster

#### Production Deployment

```bash
cd /Users/natawipa/ch-10
./scripts/production-kub/deploy.sh
```

#### Local Kubernetes Deployment

```bash
cd /Users/natawipa/ch-10
./scripts/local-kub/deploy.sh
```

#### Cleanup

```bash
# Production
./scripts/production-kub/delete.sh

# Local
./scripts/local-kub/delete.sh
```

## Verification

After deployment, verify the service is working:

1. **Check pods status**:

   ```bash
   kubectl get pods
   kubectl get deploy
   kubectl get services
   ```

2. **Test the application**:
   - Navigate to the gateway service IP
   - Click on the "Advertise" tab
   - Verify that the three e-commerce advertisements are displayed with clickable links

3. **Direct API testing**:

   ```bash
   # If running locally
   curl http://localhost:4007/advertisements

   # If deployed to Kubernetes
   kubectl port-forward service/advertise 8080:80
   curl http://localhost:8080/advertisements
   ```

## Integration with Gateway

The advertise service is integrated with the main FlixTube application through:

1. **Gateway Route**: `/advertise` route in gateway service
2. **View Template**: `gateway/src/views/advertise.hbs`
3. **Navigation**: "Advertise" tab added to all page navigation bars
4. **API Integration**: Gateway fetches data from `http://advertise/advertisements`

## Notes

- **Images**: Remember to replace the placeholder image files with actual PNG/JPG images
- **External Links**: Links open in new tabs to maintain user experience
- **Error Handling**: Graceful fallback for missing images
- **Performance**: Images are served statically for optimal performance
- **Scaling**: Service can be easily replicated for high availability
