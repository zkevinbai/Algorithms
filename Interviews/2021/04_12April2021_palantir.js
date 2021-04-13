/*
Problem 1 of 3
=================================================================================
Problem Statement
------------------

given a list of tickers, 
with each ticker being updates to an individual's portfolio for that ticker
return a list of the account totals at each date

challenge is shaping the data
you do not have data on every ticker at each date
you need to carry based on the previous period
*/


/*
Problem 2 of 3
=================================================================================
Problem Statement
------------------
We've discovered a large amount of public data on taxi trips that have been taken in New York. 
The goal is to build some kind of system or service that utilises this data to improve taxi driver's lives. 
Our initial user will be my uncle, who we want to give a V0 of the idea to in 1 week.
Data.csv (8 years, updated monthly)
Medallion ID | Driver ID | Start Coordinate | End Coordinate | Distance | Start Timestamp | End Timestamp | Fare | ...
Driver Rules
- Cannot refuse a trip
- Cannot pick up a customer outside of the New York City boundary
- Cannot change the fare function
*/

/*
things to improve
* driver happiness (survey)
* driver safety (reports)
* driver income (earnings)
* driver hours / commute 

improve driver income
* use end /start coordinates to suggest areas
* earnings / length of trip 
    - suggest daily trip composition
* use end coordinates / fine information to provide warnings
* use fare info - determine high tip earners
    * interview and learn from high tip earners
    
use end /start coordinates to suggest areas
* goal: determine best locations for earning
* filter data pool and rank start locations by earnings
    * weigh filter by frequency of starts by a single driver
* determine relationship between total drivers in area and earning
    * provide lists of places that are over / under capacity
* prompt drivers to leave / go to high earnings potential areas
* weigh this list of locations by fines / penalities
    query public fine info from state police by medalion, sort by date and location

filter data pool and rank start locations by earnings
* sort drives by earnings
    * group drives into starting locations
    * more than n (based on data sample size) entries that fit criteria for a location
(groups of start locations)
    * remove outliers
    * weigh according to single driver frequency
Plot on map
    * group close gps coordinates
    * block level area data
Consider traffic on a block by block basis
    * weigh by traffic
    * get year over year traffic for given blocks 
    
input

// sort drives by earnings

return list of drives by earnings, exclude all earnings below e (based on market data / sample)

// remove outliers

filter list of drives, remove entries with fewer by n entries (based sample size)

// group geographically

group into "blocks" determined by gps starting locations of drives
exclusionary sort (by longitude and latitude)

// order by traffic

use external traffic api per "block", center GPS of block
prefer locations without heavy traffic

output
list of "Blocks"
* earnings
* frequency (normalize year over year)
* traffic

first deliverable
* list of locations to visit

// which times to visit 

filter blocks's earnings by time
* group times (hourly basis) that are great for earnings

monolith server
* constantly query the public database on a (n interval) basis
* filter the data / build our blocks model

client / UI
* represent blocks on a map 
* show specific data perblock

Evaluation
* a/b test
* provide software to a group of drivers
* compare against control
* evaluate delta of earnings vs average expected

Priorities
* locations to visit
* times to visit
* drivers provide live data
* update model of city live
*/

/*
Problem 3 of 3
=================================================================================
Problem Statement
------------------

Debug contact tracing application
* unintentional additional challenge - only python and java available

I solved it!

*/