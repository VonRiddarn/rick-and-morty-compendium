# The Rick and Morty compendium
A streamlined way to look through the public rick and morty api!  
We got **buttons** and **pictures**! What more could you want?

## Cached element nodes
We're creating 2 element-nodes at site initialization:  
* Main
* Favorites

We're then mapping these instances to a "Page" enum for easy access.
The reason for this is because we want to be able to keep state and eventlisteners alive when toggling between them.  
This will use some extra memory and *might* have slight performance implications, which we will ignore until proven a problem.  

**What this implies**  
* Rate limit protection
* Less loading times
* Real time background-updates

Note that we are only storing the visual elements (and button functionality) in the `main` nodes.  
Data collected from the API, or saved locally by choise is saved separately.  

**How it works**  
When receieving new information for a page, we apply it to that page's node directly.  
After a page node has been updated a request is made to update the DOM.  
The condition for updating the DOM is that the currently viewed page is connected to the updated node.  

## About the inline SVG files in index.html
I am using inline SVGs to affect their appearance easily using the `currentcolor` attribute as fill.  
Originally I was planning on injecting the SVGs dynamically at runtime, but decided against it.  

**Concidered approaches**  
* Async fetching of local .svg files
* An SVG repository object storing SVGs as strings

**Why I decided against**  
Although dynamic injection would have a nice structure to it, I would still need to have the original file or variable use `fill="currentcolor"` for it to be effective.  
Otherwise, I'd have to replace the default fill with `currentcolor` at injection.  
Due to the projects low scope, it's very unlikely that we will face a scenario where we'd benefit marginally from separating the SVGs at this time.  
On the contray we'd sacrafice the browsers ability to locally cachce the static svg element.  

## SEO Implications
~~Due to how we are loading the headers containing the `h1` tag, as well as the content for `main` dynamically we are missing out on optimization.~~  
~~This is okay in a learning-oriented environment like a school project.~~  
~~In production it would be best to look into `server-side rendering` or `static site generation`.~~  

We are using a static header with the `h1` base as the main page.  
This does affect the SEO positively, but wasn't the reason for this design choise.  
Any and all advanced SEO considerations will not be humored during this project as it will probably fall out of scope, especially with this tech stack.