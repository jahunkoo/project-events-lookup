# This Folder created for fixing conflict between FSD and NextJS on pages layer.

[Moving the pages folder of NextJS to the root folder of the project (recommended)](https://feature-sliced.design/docs/guides/tech/with-nextjs#moving-the-pages-folder-of-nextjs-to-the-root-folder-of-the-project-recommended)

The approach is to move the pages NextJS folder to the root folder of the project and import the FSD pages into the pages NextJS folder. This saves the FSD project structure inside the src folder.

├── pages              # NextJS pages folder
├── src
│   ├── app
│   ├── entities
│   ├── features
│   ├── pages          # FSD pages folder
│   ├── shared
│   ├── widgets