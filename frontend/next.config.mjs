/** @type {import('next').NextConfig} */
const nextConfig = {
     // next.config.js
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true, // Ignore TypeScript errors
      },
    eslint: {
        ignoreDuringBuilds: true, // Ignore ESLint errors
    },
   
    webpack: (config, { webpack }) => {
        // Use the webpack instance from the function's arguments
      config.plugins.push(
          new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
          })
      )
    }
}

// reactStrictMode: true,
// export function webpack(config, { webpack }) {
//     // Use the webpack instance from the function's arguments
//     config.
//     )

//     // Important: return the modified config
//     return config;
// }
  