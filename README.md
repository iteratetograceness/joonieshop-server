# JOONIESHOP SERVER

## Local Development

### Starting and stopping a Redis Server

```bash 
brew services start redis
brew services stop redis
```

## Email Templates

### Compiling React Templates
    
```bash
npx babel 'customer_created/html.jsx' --presets=@babel/preset-env,@babel/preset-react -o 'customer_created/html.js'
```