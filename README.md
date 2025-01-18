# The Rick and Morty compendium
A streamlined way to look through the public rick and morty api!  
We got **buttons** and **pictures**! What more could you want?

## Cached element nodes
We're baking 2 pages at site initialization:  
* Main
* Favorites

The reason for this is because we want to be able to keep state and eventlisteners alive when toggling between them.  
This will use some extra memory and *might* have slight performance implications, which we will ignore until proven a problem.  
The resoning:  
* Rate limit protection
* Less loading times
* Real time background-updates

Note that we are only storing root objects. We will **NOT** cache notes that are applied to different entities.  
These will be loaded via a dictionary when the entity is shown in the inspector modal.

## SEO Implications
Due to how we are loading the headers containing the `h1` tag, as well as the content for `main` dynamically we are missing out on optimization.  
This is okay in a learning-oriented environment like a school project.  
In production it would be best to look into `server-side rendering` or `static site generation`.