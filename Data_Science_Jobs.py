
# coding: utf-8

# #Import all required libraries

# In[2]:

from bs4 import BeautifulSoup
import urllib
import re
import datetime
import feedparser
import pandas as pd
from nltk.tokenize import word_tokenize
import json
import urllib.request


# #Define tags

# In[3]:

skills_list = ['Python','Ruby','Scala','Go','R','Octave','Perl','C/C++','Java','SQL','Hadoop','Hive','Pig','Spark','noSQL','QlickView','Tableau','D3.js','SAS','MySQL','Lua','SPSS','Julia','ArcGIS','MongoDb','Cassandra','Azure','AWS','Redis','Hbase','MATLAB','Storm','Redshift','Kafka','Vertica','Greenplum','Teradata','Theano','TensorFlow','H2O','Xeno','MapReduce','Rapidminer','Numenta','Nupic','Solr']
tech_list = ['Artificial Intelligence','Natural Language Processing','Operations Research','Bioinformatics','NLP','Data Visualization','Data Engineering','Statistics','Deep Learning','Computer Vision','Analytics','Machine Learning','AI','Big Data']
worktype_list = ['Part-time','Contract','Visa Sponsorship','Remote']
domain_list = ['Finance','Trading','Marketing','HealthCare','Sports']


# #Define functions to scrape and extract need info.

# In[4]:

def soupify(url):
    with urllib.request.urlopen(url) as url:
        content = url.read()
    soup= BeautifulSoup(content, 'html.parser')  
    return soup


# In[5]:

def tags(desc,listname):
    return list(set([tag for tag in word_tokenize(desc) if tag in listname]))

def kaggle_tagsloop(desc):
    return tags(desc,worktype_list) + tags(desc,domain_list) + tags(desc,tech_list) + tags(desc,skills_list)


# In[6]:

def extract(source,jobs,fn_company_name,fn_company_logo,fn_job_position,fn_job_location,fn_posted_date,fn_job_link,fn_job_desc):
    company_name = []
    company_logo = []
    job_position = []
    job_location = []
    posted_date = []
    job_link = []
    job_desc = []
    
    for element in jobs:
        column1 = fn_company_name(element)
        company_name.append(column1)
        column2 = fn_company_logo(element)
        company_logo.append(column2)
        column3 = fn_job_position(element)
        job_position.append(column3)
        column4 = fn_job_location(element)
        job_location.append(column4)
        column5 = fn_posted_date(element)
        posted_date.append(column5)
        column6 = fn_job_link(element)
        job_link.append(column6)
        column7 = fn_job_desc(element)
        job_desc.append(column7)
        
    columns = {'Source': source, 'company_name': company_name, 'company_logo': company_logo, 'job_position': job_position, 'job_location': job_location, 'posted_date': posted_date,'job_link':job_link,'job_desc':job_desc}
    df = pd.DataFrame(columns)
    return(df)


# #kaggle job board

# In[7]:

source_kaggle = 'Kaggle'
url_kaggle = 'https://www.kaggle.com/jobs'
jobs_kaggle = soupify(url_kaggle).find_all("a", class_="job-post-row")

def kaggle_descloop(url_gm):
    with urllib.request.urlopen(url_gm) as url_gm:
        content_gm = url_gm.read()
        soup_gm = BeautifulSoup(content_gm, 'html.parser')
        return soup_gm.find(class_ = "jobs-board-post").get_text()

def kaggle_company_name(element):
    return element.find("div",class_ ="location").get_text().split('·')[0]
def kaggle_company_logo(element):
    return element.find("img").get('src')
def kaggle_job_position(element):
    return element.find("div",class_ ="position").get_text()
def kaggle_job_location(element):
    return element.find("div",class_ ="location").get_text().split('·')[1]
def kaggle_posted_date(element):
    return ' '.join(element.find("div",class_ ="post-date").get_text().split(' ')[1:3])
def kaggle_job_link(element):
    return "https://www.kaggle.com" + element.get('href')
def kaggle_desc(element):
    return kaggle_descloop("https://www.kaggle.com" + element.get('href'))


# In[8]:

kaggle = extract(source_kaggle,jobs_kaggle,kaggle_company_name,kaggle_company_logo,kaggle_job_position,kaggle_job_location,kaggle_posted_date,kaggle_job_link,kaggle_desc)


# #kdnuggets job board

# In[224]:

source_kdnuggets = 'Kdnuggets'
url_kdnuggets = "http://www.kdnuggets.com/jobs/index.html"
jobs_kdnuggets = soupify(url_kdnuggets).find(class_ = "three_ul").find_all("li")

def kdnuggets_imgloop(url_gm):
    with urllib.request.urlopen(url_gm) as url_gm:
        content_gm = url_gm.read()
        soup_gm = BeautifulSoup(content_gm, 'html.parser')
        return soup_gm.find(class_ = "post").find("img").get('src')

def kdnuggets_locloop(url_gm):
    pattern = re.compile(r'Location')
    with urllib.request.urlopen(url_gm) as url_gm:
        content_gm = url_gm.read()
        soup_gm = BeautifulSoup(content_gm, 'html.parser')
        return soup_gm.find(class_ = "post").find("b",string = pattern).get_text().split(': ')[1]
    
def kdnuggets_descloop(url_gm):
    with urllib.request.urlopen(url_gm) as url_gm:
        content_gm = url_gm.read()
        soup_gm = BeautifulSoup(content_gm, 'html.parser')
        return soup_gm.find('div',id = "post-").get_text()
    
    
def kdnuggets_company_name(element):
    return element.find("a").get_text().split(':')[0]
def kdnuggets_company_logo(element):
    return kdnuggets_imgloop(element.find("a").get('href')) if "http" in kdnuggets_imgloop(element.find("a").get('href')) else "http://www.kdnuggets.com/" + kdnuggets_imgloop(element.find("a").get('href')) 
def kdnuggets_job_position(element):
    return element.find("a").get_text().split(':')[1]
def kdnuggets_job_location(element):
    return kdnuggets_locloop(element.find("a").get('href'))
def kdnuggets_posted_date(element):
    return element.find("b").nextSibling.split('-')[1]
def kdnuggets_job_link(element):
    return element.find("a").get('href')
def kdnuggets_desc(element):
    return kdnuggets_descloop(element.find("a").get('href'))


# In[225]:

kdnuggets = extract(source_kdnuggets, jobs_kdnuggets,kdnuggets_company_name,kdnuggets_company_logo,kdnuggets_job_position,kdnuggets_job_location,kdnuggets_posted_date,kdnuggets_job_link,kdnuggets_desc)


# #datawerq job board

# In[11]:

source_datawerq = 'Datawerq'
url_datawerq = "https://www.datawerq.com/"
jobs_datawerq = soupify(url_datawerq).find(class_="col-md-8 col-sm-12").find_all(class_ = "row joblisting")


def datawerq_descloop(url_gm):
    with urllib.request.urlopen(url_gm) as url_gm:
        content_gm = url_gm.read()
        soup_gm = BeautifulSoup(content_gm, 'html.parser')
        return soup_gm.find(class_ = "row job-detail").get_text()

def datawerq_company_name(element):
    return element.find(class_ = "col-md-4 col-sm-6 col-xs-6 company").find("h4").find("a").get_text()
def datawerq_company_logo(element):
    return element.find("img").get('src')
def datawerq_job_position(element):
    return element.find(class_ = "col-md-6 col-sm-6 col-xs-6").find("h4").get_text()
def datawerq_job_location(element):
    return element.find(class_ = "col-md-4 col-sm-6 col-xs-6 company").find("p").get_text()
def datawerq_posted_date(element):
    return element.find(class_ = "col-md-6 col-sm-6 col-xs-6").find("p").get_text()
def datawerq_job_link(element):
    return "https://www.datawerq.com" + element.find(class_ = "col-md-6 col-sm-6 col-xs-6").find("a").get('href')
def datawerq_desc(element):
    return datawerq_descloop("https://www.datawerq.com" + element.find(class_ = "col-md-6 col-sm-6 col-xs-6").find("a").get('href'))


# In[12]:

url_datawerq1 = "https://www.datawerq.com/?page=2"
jobs_datawerq1 = soupify(url_datawerq1).find(class_="col-md-8 col-sm-12").find_all(class_ = "row joblisting")

url_datawerq2 = "https://www.datawerq.com/?page=3"
jobs_datawerq2 = soupify(url_datawerq2).find(class_="col-md-8 col-sm-12").find_all(class_ = "row joblisting")

url_datawerq3 = "https://www.datawerq.com/?page=4"
jobs_datawerq3 = soupify(url_datawerq3).find(class_="col-md-8 col-sm-12").find_all(class_ = "row joblisting")

url_datawerq4 = "https://www.datawerq.com/?page=5"
jobs_datawerq4 = soupify(url_datawerq4).find(class_="col-md-8 col-sm-12").find_all(class_ = "row joblisting")


# In[13]:

datawerq = extract(source_datawerq, jobs_datawerq,datawerq_company_name,datawerq_company_logo,datawerq_job_position,datawerq_job_location,datawerq_posted_date,datawerq_job_link,datawerq_desc)
datawerq1 = extract(source_datawerq, jobs_datawerq1,datawerq_company_name,datawerq_company_logo,datawerq_job_position,datawerq_job_location,datawerq_posted_date,datawerq_job_link,datawerq_desc)
datawerq2 = extract(source_datawerq, jobs_datawerq2,datawerq_company_name,datawerq_company_logo,datawerq_job_position,datawerq_job_location,datawerq_posted_date,datawerq_job_link,datawerq_desc)
datawerq3 = extract(source_datawerq, jobs_datawerq3,datawerq_company_name,datawerq_company_logo,datawerq_job_position,datawerq_job_location,datawerq_posted_date,datawerq_job_link,datawerq_desc)
datawerq4 = extract(source_datawerq, jobs_datawerq4,datawerq_company_name,datawerq_company_logo,datawerq_job_position,datawerq_job_location,datawerq_posted_date,datawerq_job_link,datawerq_desc)


# #dataelixir job board

# In[208]:

source_dataelixir = 'Dataelixir'
url_dataelixir = "https://jobs.dataelixir.com/"
jobs_dataelixir = soupify(url_dataelixir).find(class_="jobList").find_all(class_ = "job-listing")

def dataelixir_descloop(url_gm):
    with urllib.request.urlopen(url_gm) as url_gm:
        content_gm = url_gm.read()
        soup_gm = BeautifulSoup(content_gm, 'html.parser')
        return soup_gm.find(class_ = "panel-body").get_text()

def dataelixir_company_name(element):
    return element.find(class_ = "jobList-intro").find("a").next_sibling.contents[0]
def dataelixir_company_logo(element):
    return 'NL' if element.find("img").get('src') == '//d1stfaw6j21ccs.cloudfront.net/assets/main/fallback_job_logo-f85127a73133a1238ba3dfde66660dc9d8649d47df4b0312c069f7b502696ba8.png' else element.find("img").get('src')
def dataelixir_job_position(element):
    return element.find(class_ = "jobList-intro").find("strong").get_text() 
def dataelixir_job_location(element):
    return element.find(class_ = "jobList-location text-muted").get_text()
def dataelixir_posted_date(element):
    return element.find(class_ = "jobList-date").get_text()
def dataelixir_job_link(element):
    return "https://jobs.dataelixir.com" + element.find("a").get('href')
def dataelixir_desc(element):
    return dataelixir_descloop("https://jobs.dataelixir.com" + element.find("a").get('href'))


# In[209]:

dataelixir = extract(source_dataelixir,jobs_dataelixir,dataelixir_company_name,dataelixir_company_logo,dataelixir_job_position,dataelixir_job_location,dataelixir_posted_date,dataelixir_job_link,dataelixir_desc)


# #analyticstalent job board

# In[16]:

source_analyticstalent = 'AnalyticsTalent'
url_analyticstalent = "http://careers.analytictalent.com/jobs/data-scientist-data-scientist-302382951-b?page=1"
jobs_analyticstalent = soupify(url_analyticstalent).find(class_="aiResultsStackedWrapper aiClearfix").find_all(class_ = "aiResultsWrapper")

def analyticstalent_descloop(url_gm):
    with urllib.request.urlopen(url_gm) as url_gm:
        content_gm = url_gm.read()
        soup_gm = BeautifulSoup(content_gm, 'html.parser')
        return soup_gm.find("div",id = "detailTab").get_text()

def analyticstalent_company_name(element):
    return element.find(class_ = "aiResultsCompanyName").get_text()
def analyticstalent_company_logo(element):
    return 'NL'
def analyticstalent_job_position(element):
    return element.find("a").get_text() 
def analyticstalent_job_location(element):
    return element.find(class_ = "aiResultsLocationSpan").get_text()
def analyticstalent_posted_date(element):
    return element.find("div",class_ = "aiDescriptionPod").find_all("li")[2].get_text()
def analyticstalent_job_link(element):
    return "http://careers.analytictalent.com/jobs" + element.find("a").get('href')
def analyticstalent_desc(element):
    return analyticstalent_descloop("http://careers.analytictalent.com/jobs" + element.find("a").get('href'))


# In[17]:

url_analyticstalent1 = "http://careers.analytictalent.com/jobs/data-scientist-data-scientist-302382951-b?page=2"
jobs_analyticstalent1 = soupify(url_analyticstalent1).find(class_="aiResultsStackedWrapper aiClearfix").find_all(class_ = "aiResultsWrapper")

url_analyticstalent2 = "http://careers.analytictalent.com/jobs/data-scientist-data-scientist-302382951-b?page=3"
jobs_analyticstalent2 = soupify(url_analyticstalent2).find(class_="aiResultsStackedWrapper aiClearfix").find_all(class_ = "aiResultsWrapper")

url_analyticstalent3 = "http://careers.analytictalent.com/jobs/data-scientist-data-scientist-302382951-b?page=4"
jobs_analyticstalent3 = soupify(url_analyticstalent3).find(class_="aiResultsStackedWrapper aiClearfix").find_all(class_ = "aiResultsWrapper")

url_analyticstalent4 = "http://careers.analytictalent.com/jobs/data-scientist-data-scientist-302382951-b?page=5"
jobs_analyticstalent4 = soupify(url_analyticstalent4).find(class_="aiResultsStackedWrapper aiClearfix").find_all(class_ = "aiResultsWrapper")


# In[18]:

analyticstalent = extract(source_analyticstalent,jobs_analyticstalent,analyticstalent_company_name,analyticstalent_company_logo,analyticstalent_job_position,analyticstalent_job_location,analyticstalent_posted_date,analyticstalent_job_link,analyticstalent_desc)
analyticstalent1 = extract(source_analyticstalent,jobs_analyticstalent1,analyticstalent_company_name,analyticstalent_company_logo,analyticstalent_job_position,analyticstalent_job_location,analyticstalent_posted_date,analyticstalent_job_link,analyticstalent_desc)
analyticstalent2 = extract(source_analyticstalent,jobs_analyticstalent2,analyticstalent_company_name,analyticstalent_company_logo,analyticstalent_job_position,analyticstalent_job_location,analyticstalent_posted_date,analyticstalent_job_link,analyticstalent_desc)
analyticstalent3 = extract(source_analyticstalent,jobs_analyticstalent3,analyticstalent_company_name,analyticstalent_company_logo,analyticstalent_job_position,analyticstalent_job_location,analyticstalent_posted_date,analyticstalent_job_link,analyticstalent_desc)
analyticstalent4 = extract(source_analyticstalent,jobs_analyticstalent4,analyticstalent_company_name,analyticstalent_company_logo,analyticstalent_job_position,analyticstalent_job_location,analyticstalent_posted_date,analyticstalent_job_link,analyticstalent_desc)


# #github job board

# In[19]:

source_github = 'Github'
url_github = "https://jobs.github.com/positions?description=data+scientist&location="
jobs_github = soupify(url_github).find(class_ = "positionlist").find_all("tr")


def github_descloop(url_gm):
    with urllib.request.urlopen(url_gm) as url_gm:
        content_gm = url_gm.read()
        soup_gm = BeautifulSoup(content_gm, 'html.parser')
        return soup_gm.find(class_ = "inner").get_text()

def github_company_name(element):
    return element.find(class_ = "company").get_text()
def github_company_logo(element):
    return 'NL'
def github_job_position(element):
    return element.find("h4").get_text()
def github_job_location(element):
    return element.find(class_ = "location").get_text()
def github_posted_date(element):
    return element.find(class_ = "when relatize").get_text()
def github_job_link(element):
    return "https://jobs.github.com" + element.find("a").get('href')
def github_desc(element):
    return github_descloop("https://jobs.github.com" + element.find("a").get('href'))


# In[20]:

github = extract(source_github,jobs_github,github_company_name,github_company_logo,github_job_position,github_job_location,github_posted_date,github_job_link,github_desc)


# #stackoverflow job board

# In[21]:

source_stackoverflow = 'Stackoverflow'
url_stackoverflow = "http://stackoverflow.com/jobs?sort=i&q=data+scientist"
jobs_stackoverflow = soupify(url_stackoverflow).find(class_ = "listResults").find_all(class_ = "-item -job -job-item")

def stackoverflow_descloop(url_gm):
    with urllib.request.urlopen(url_gm) as url_gm:
        content_gm = url_gm.read()
        soup_gm = BeautifulSoup(content_gm, 'html.parser')
        return soup_gm.find(class_ = "description").get_text()


def stackoverflow_company_name(element):
    return element.find(class_ = "-name").get_text()
def stackoverflow_company_logo(element):
    return 'NL'
def stackoverflow_job_position(element):
    return element.find(class_ = "job-link").get_text()
def stackoverflow_job_location(element):
    return element.find(class_ = "-location").get_text().split('-')[1]
def stackoverflow_posted_date(element):
    return element.find(class_ = "-posted-date").get_text().replace("ago","").replace("< ","")
def stackoverflow_job_link(element):
    return element.find(class_ = "job-link").get('href')
def stackoverflow_desc(element):
    return stackoverflow_descloop(element.find(class_ = "job-link").get('href'))


# In[22]:

stackoverflow = extract(source_stackoverflow,jobs_stackoverflow,stackoverflow_company_name,stackoverflow_company_logo,stackoverflow_job_position,stackoverflow_job_location,stackoverflow_posted_date,stackoverflow_job_link,stackoverflow_desc)


# #date standardization

# In[23]:

def date_format(date):
    if date == 'yesterday':
        return datetime.date.today() - datetime.timedelta(days=1)
    elif date == 'today':
        return datetime.date.today()
    elif 'hours' in date:
        return datetime.date.today() - datetime.timedelta(days=1)
    elif 'days' in date:
        return datetime.date.today() - datetime.timedelta(days= int(date.split(' ')[0]))
    elif 'months' in date:
        return datetime.date.today() - datetime.timedelta(days= 30*int(date.split(' ')[0]))
    elif re.match('[0-9]+h+',date):
        return datetime.date.today()
    elif re.match('[0-9]+d+',date):
        return datetime.date.today() - datetime.timedelta(days= int(re.search(r'\d+',date).group()))
    elif re.match('[0-9]+w+',date):
        return datetime.date.today() - datetime.timedelta(days= 7*int(re.search(r'\d+',date).group()))
    else: 
        try:
            return datetime.datetime.strptime(date, "%d-%b-%y").date()
        except Exception:
            try:
                return datetime.datetime.strptime(date, "%m/%d/%Y").date()
            except Exception:
                try:
                    return datetime.datetime.strptime(date, "%d %b").date().replace(year= datetime.datetime.now().year)
                except Exception:
                    try:
                        return datetime.datetime.strptime(date, "%B %d, %Y").date()
                    except Exception:
                        try:
                            return datetime.datetime.strptime(date, "%b %d, %Y").date()
                        except Exception:
                            try:
                                return datetime.datetime.strptime(date, "%b. %d, %Y").date()
                            except Exception:
                                try:
                                    return datetime.datetime.strptime(date, "%Y-%m-%d %H:%M:%S UTC").date()
                                except Exception:
                                    try:
                                        return datetime.datetime.strptime(date, "%b %d").date().replace(year= datetime.datetime.now().year)
                                    except Exception:
                                        print("-")
        


# In[100]:

def timeline_container(date):
    if (datetime.date.today() - date).days <= 7:
        return 'Current_week'
    if (datetime.date.today() - date).days > 7 and (datetime.date.today() - date).days <= 30:
        return 'Current_month'
    if (datetime.date.today() - date).days > 30:
        return 'Previous_months'


# In[105]:

def posted_days_ago(date):
    if (datetime.date.today() - date).days == 0:
        return 'Today'
    if (datetime.date.today() - date).days == 1:
        return 'Yesterday'
    if (datetime.date.today() - date).days > 1:
        return '%s days ago' %(datetime.date.today() - date).days


# In[227]:

data = kaggle.append(kdnuggets,ignore_index = True).append(datawerq,ignore_index = True).append(datawerq1,ignore_index = True).append(datawerq2,ignore_index = True).append(datawerq3,ignore_index = True).append(datawerq4,ignore_index = True).append(dataelixir,ignore_index = True).append(analyticstalent,ignore_index = True).append(analyticstalent1,ignore_index = True).append(analyticstalent2,ignore_index = True).append(analyticstalent3,ignore_index = True).append(analyticstalent4,ignore_index = True).append(github,ignore_index = True).append(stackoverflow,ignore_index = True)


# In[228]:

data["company_logo"] = data["company_logo"].map(str.strip)
data["company_name"] = data["company_name"].map(str.strip)
data["job_link"] = data["job_link"].map(str.strip)
data["job_location"] = data["job_location"].map(str.strip)
data["job_position"] = data["job_position"].map(str.strip)
data["posted_date"] = data["posted_date"].map(str.strip)
data["job_desc"] = data["job_desc"].map(str.strip)


# In[229]:

data["posted_date"] = data["posted_date"].apply(date_format)
data["tags"] = data["job_desc"].apply(kaggle_tagsloop)
data['Rank'] = data.sort_values(['posted_date'], ascending=[False]).groupby(['company_name','job_position']).cumcount() + 1


# In[230]:

output = data[(data.Rank == 1)]
output = output.sort('posted_date', ascending=False)
output['posted_days_ago'] =  output["posted_date"].apply(posted_days_ago)
output['timeline_container'] =  output["posted_date"].apply(timeline_container)
output = output.reset_index(drop=True)
output['index_col'] = output.index


# In[231]:

output1 = output[['index_col','Source','company_logo','company_name','job_link','job_location','job_position','tags','posted_days_ago','timeline_container']]


# In[139]:

output_json = output1.to_json(orient='records')
output_jsonload = json.loads(out)
with open('job_details.json', 'w') as outfile:
    json.dump(output_jsonload, outfile)


# In[235]:

def get_images(data):
    default_image_link = "https://cdnd.icons8.com/wp-content/uploads/2015/06/Lighthouse-512.png"
    filename= "%s.png" %data['index_col']
    image_link = default_image_link if data['company_logo'] == "NL" else data['company_logo'] 
    opener=urllib.request.build_opener()
    opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
    urllib.request.install_opener(opener)
    urllib.request.urlretrieve(image_link, filename)


# In[234]:

output1.apply(get_images, axis = 1)


# In[ ]:



