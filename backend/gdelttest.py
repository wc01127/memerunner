from gdeltdoc import GdeltDoc, Filters, multi_repeat

f = Filters(
    keyword = "trump",
    start_date = "2024-01-28",
    end_date = "2024-02-04",
    country = "US",
    #repeat = repeat(2, "crypto")
    repeat = multi_repeat([(2, "crypto"), (2, "meme")], "OR")
)

gd = GdeltDoc()

# Search for articles matching the filters
articles = gd.article_search(f)

# Get a timeline of the number of articles matching the filters
#imeline = gd.timeline_search("timelinevol", f)
print(articles)
articles.to_csv('out.csv')

# language: english
# min 5 characters
# use "name" - string any special characters and words between them
