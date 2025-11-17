# Web Dev Starter Code

# GPU Price Finder

## Overview

For this project I want to build a small full stack site that helps people quickly check GPU prices, with a specific focus on used cards. PCPartPicker and similar sites lean more toward new parts and can feel busy when all you want is a quick sense of what a used card is going for. My site leans the other way. New prices are there for context, but the main goal is to make used GPU prices easy to see and compare.

This will not be a giant market tracker. The first version will use a small curated set of GPUs and a limited number of example listings, roughly a dozen or so products with a mix of new and used entries. The goal is to have a clean flow from the browser to AWS with clear condition filters, instead of trying to cover every card and every vendor.

On the technical side I will use plain HTML, CSS, and JavaScript with no frameworks. The back end will run on AWS using API Gateway, Lambda, and DynamoDB. The browser will only talk to my own API endpoints. If I ever pull in external price sources, that would happen inside Lambda. For this class project the main focus is a working full stack pipeline and condition based querying, not deep third party integration.

## What the site will do

The core workflow looks like this.

1. User picks a GPU model and condition  
2. Site queries stored GPU data on AWS  
3. Matching entries are shown in a small results list  
4. User can save specific results into a watchlist and later view or remove them  

The landing page is also the main search page. There will be a form where you can type a GPU name or pick from a list of common models, plus a condition selector with three options. All cards, new only, or used only. The used only option is the main difference from more general sites. When you submit the form, JavaScript will send a request to an AWS API endpoint. A Lambda function will take the model and condition, query DynamoDB, and return matching entries as JSON.

Results will be rendered in a table or set of cards on that page. Each entry will show the GPU model, whether it is new or used, the price, and a simple origin label such as Vendor A, Vendor B, or something like eBay or Amazon. For this version I will seed those values manually. There will also be a button next to each entry that adds it to a watchlist. Clicking that button will call another AWS endpoint that writes a record to a watchlist table in DynamoDB.

A second page will show the watchlist. That page will fetch saved items and display them in a list or table, with a way to remove entries. This covers basic create, read, and delete operations while still matching the main theme of tracking interesting GPU prices, especially used ones.

There will also be a simple stats page. It will show straightforward information like the average price for a specific card, the average for new cards versus used cards, the lowest price seen in the data, and how many entries exist for that model. Since the project is focused on used cards, I want the stats to make it obvious how much cheaper used cards are in the sample dataset compared to new versions. These stats can be calculated in JavaScript after fetching data from the API.

## Target audience

The main audience is people who already know which GPU they are looking at and want a quick way to see how used prices compare to new prices. That could be a new PC builder deciding if a used mid range card is worth it, or someone hunting for deals who wants a simple used only view.

The secondary audience is the instructor and anyone who wants to see a clear AWS backed web project. The code will show how plain HTML and JavaScript can talk to a cloud backend without heavy front end tools while still doing something practical.

## Data it will manage

The site will manage two main types of dynamic data.

The first type is the GPU price entries stored in DynamoDB. These entries will be seeded by me. Each record will include:

1. A unique id  
2. GPU model name, such as RTX 3060 or RX 6700 XT  
3. Brand or vendor label  
4. Condition, new or used, with enough used entries to make that filter meaningful  
5. Price in dollars  
6. A tier or category field like entry level, mid range, or high end  
7. An optional URL or reference field  

The second type of data is the watchlist. When a user clicks to save a GPU from the results, that triggers a call to the watchlist endpoint in AWS. The Lambda function will write a record into a watchlist table with a watchlist id, a reference to the GPU id, and a timestamp. For this project version the watchlist can be kept simple and global or loosely tied to a session.

All of this data will be created and managed through forms and buttons. Static text and any logos will live in normal HTML and CSS and are not part of the dynamic data layer.

## Stretch goals

If the core search, condition filters, AWS integration, and watchlist work reliably, there are a few stretch goals I might explore.

1. Add a marketplace API call in Lambda for at least one source, pulling a few real used listings for a model and merging them into the stored data  
2. Expand filters on the search page so you can limit by price range or brand while still focusing on the used versus new split  
3. Add sorting controls on the results so you can order by price or group entries with used cards listed first  
4. Improve the stats page with a clearer visual indicator of the gap between new and used pricing for each card  
5. Add a simple compare view where you can select two GPUs and see average new and used prices side by side


## Project Wireframe

TODO: Replace the wireframe below with you own design.

![wireframe](wireframe-example.png)
