# epiViz

## About the project
This project is a visualization of the spreading of a pandemic. We have used a simple epidemiologic model called [SIR](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology#The_SIR_model), which defines three states a person can be in: Susceptible, Infectious and Recovered or Removed. This is a simple model that is capable of representing a lot of situations that we can find in a pandemic.

In our case, we decided to represent three scenarios. Each person (represented as a dot) has a family, a job, and goes to different recreational places, which change every day. You can think of these places as a Supermarket, a bar, a bus, a clothes shop, etc. A person wakes up at home, goes to work, and then goes to a random recreational location, and in each place interacts (directly or indirectly, by touching the same things as others) with every person that is or was there. Each infected person has a probability (infection ratio) of infecting every person he has interacted with. This ratio is based on the sanity measures both interactors are doing, such as cleaning your hands frequently, wearing mask and keeping social distance.

## About us
We are a group of 3 students of the Polytechnic University of Barcelona (UPC).
We have been attending to different hackathons during the past year, and love to make projects together. To find out more about us, visit our websites:
<br>
[Pau](https://pauescofet.com)
<br>
[Marc](http://marcamoros.me)
<br>
[Nicolas](https://www.linkedin.com/in/nicolas-camerlynck-segarra-9220bb169/)

[Live version](https://marcamoros.me/coviz)
