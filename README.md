# Template Demo Collection

This repository contains a collection of static HTML website templates and their demo variations. Each template is kept in its own directory with the files it needs to run, including HTML pages, stylesheets, JavaScript, fonts, images, and video assets where applicable.

## Preview a template

No build step or package installation is required. You can open a template page directly in a browser, or serve the repository locally for more reliable asset loading:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000/<template>/` and open the page you want to preview. For example:

```text
http://localhost:8000/agenci/demo.html
http://localhost:8000/atelieux/index.html
```

You can also open any `.html` file directly from the file system when browser security restrictions do not affect the template's assets.

## Repository layout

Top-level directories represent individual template collections, such as:

- `agenci/`
- `atelieux/`
- `avenir/`
- `bientot/`
- `bleux/`
- `brainux/`
- `casely/`
- `comet/`
- `companyon/`
- `creation/`
- `cutekit-pages/`
- `cutekit-ui/`
- `demain/`
- `emerald/`
- `emotion/`
- `encours/`
- `espera/`
- `firetime/`
- `flux/`
- `futurion/`
- and the other template directories in this repository.

Most collections provide a combination of:

- `index.html` or a similarly named home page
- Alternate layouts such as slideshow, video, particle, fullscreen, or style variants
- `demo.html` pages that link to available variations
- `css/`, `js/`, `fonts/`, `img/`, and `vid/` asset directories

## Editing a template

1. Choose a template directory.
2. Start with its `demo.html` or primary `index*.html` page.
3. Update the page content and styles in that directory.
4. Keep relative asset paths intact when moving or renaming files.
5. Preview the result through a local server.

The root `index.html` is a generic placeholder page; it is not a catalog of the included templates.

## Notes

- This is a static front-end collection and does not include a shared application runtime.
- Templates may use different conventions and third-party assets, so changes should generally stay within the selected template directory.
- Check the existing attribution and licensing information in a template before redistributing modified work.