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
Data collected from the API, or saved locally by choice is saved separately.  

**How it works**  
When receieving new information for a page, we apply it to that page's node directly.  
After a page node has been updated a request is made to update the DOM.  
The condition for updating the DOM is that the currently viewed page is connected to the updated node.  

## About the inline SVG files in index.html
I am using inline SVGs to affect their appearance easily using the `currentcolor` attribute as fill.  
Originally I was planning on injecting the SVGs dynamically at runtime, but decided against it.  

**Considered approaches**  
* Async fetching of local .svg files
* An SVG repository object storing SVGs as strings

**Why I decided against**  
Although dynamic injection would have a nice structure to it, I would still need to have the original file or variable use `fill="currentcolor"` for it to be effective.  
Otherwise, I'd have to replace the default fill with `currentcolor` at injection.  
Due to the projects low scope, it's very unlikely that we will face a scenario where we'd benefit marginally from separating the SVGs at this time.  
On the contray we'd sacrifice the browsers ability to locally cache the static svg element.  

## SEO Implications
~~Due to how we are loading the headers containing the `h1` tag, as well as the content for `main` dynamically we are missing out on optimization.~~  
~~This is okay in a learning-oriented environment like a school project.~~  
~~In production it would be best to look into `server-side rendering` or `static site generation`.~~  

We are using a static header with the `h1` base as the main page.  
This does affect the SEO positively, but wasn't the reason for this design choise.  
Any and all advanced SEO considerations will not be humored during this project as it will probably fall out of scope, especially with this tech stack.

## Why we are using EpisodeReference and parsing between crawls
The reason for this is simple: memory usage.  
Sure, the data collected is relatively light weight, but an entire episode is much heavier than an episode reference.  
When crawling through the episodes we are parsing the data between each fetch instead of mass-collecting and mass-parsing.  
In large-scale environments using hundreads of episodes (there are `51` at the time of writing, with `20` yet to be added),  
this approach will ensure that the memory footprint is stable and prevents the application from running out of memory.

**Memory usage estimations**
| Severity | Episode | EpisodeReference | Reduction (%) |
| - | - | - | - |
| Best | ~1638 bytes | ~179 bytes | 89.06% |
| Average | ~3402 bytes | ~179 bytes | 94.73% |
| Worst | ~6144 bytes | ~180 bytes | 97.07% |  

*Estimations have been made with the help of ai using a snippet of the dataset.*  
*As we can see in these estimations, the average Episode can grow up to about `3,4 KB` in size, whilst the reference is just `0,16 KB`.*  

**This estimation takes into account**
* Baseline overhead from JS objects
* Baseline overhead from property references
* Variable values for each property references

**Pros**
* Very low risk of memory bottleneck.
* Easy to interfere with process for testing.

**Cons**
* Excessive calls to the garbage collector.
* Reduced readability due to callstack jumping.