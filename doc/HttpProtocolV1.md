# HTTP REST Protocol (version 1) <br/> Guides Microservice

Guides microservice implements a HTTP compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [GuidePageV1 class](#class1)
* [GuideV1 class](#class2)
* [POST /guides/get_guides](#operation1)
* [POST /guides/get_random_guide](#operation2)
* [POST /guides/get_guide_by_id](#operation3)
* [POST /guides/create_guide](#operation4)
* [POST /guides/update_guides](#operation5)
* [POST /guides/delete_guides_by_id](#operation6)

## Data types

### <a name="class1"></a> GuidePageV1 class

Contains single page from a guide

**Properties:**
- title: MultiString - page title in multiple lanuguages
- content: MultiString - page content in multiple languages
- more_url: string - Url with additional information
- color: string - page background color code or name
- pic_id: string - picture block id from blobs to show at the page

### <a name="class4"></a> GuideV1 class

Represents a system guide. 

**Properties:**
- id: string - unique guide id
- type: string - guide type, i.e. 'introduction', 'new release', etc.
- app: string - (optional) application name
- version: string - (optional) application version
- create_time: Date - date and time when guide was created
- pages: [GuidePageV1] - (optional) array of pages
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search
- status: string - editing status: 'new', 'writing', 'translating', 'completed' (default: 'new')
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## Operations

### <a name="operation1"></a> Method: 'POST', route '/guides/get_guides'

Retrieves a list of guides by specified criteria

**Request body:** 
- filter: object - filter parameters
  - type: string - (optional) guide type
  - app: string - (optional) application name
  - version: string - (optional) application version
  - status: string - (optional) editing status
  - tags: [string] - search tags
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
DataPage<GuideV1> or error

### <a name="operation2"></a> Method: 'POST', route '/guides/get\_random\_guide'

Retrieves a random guide from filtered resultset

**Request body:** 
- filter: object - filter parameters
  - type: string - (optional) guide type
  - app: string - (optional) application name
  - version: string - (optional) application version
  - status: string - (optional) editing status
  - tags: [string] - search tags

**Response body:**
Random GuideV1 object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/guides/get\_guide\_by\_id'

Retrieves a single guide specified by its unique id

**Request body:** 
- guide_id: string - unique guide id

**Response body:**
GuideV1 object, null if object wasn't found or error 

### <a name="operation4"></a> Method: 'POST', route '/guides/create_guide'

Creates a new system guide

**Request body:**
- guide: GuideV1 - Guide to be created. If object id is not defined it is assigned automatically.

**Response body:**
Created GuideV1 object or error

### <a name="operation5"></a> Method: 'POST', route '/guides/update_guide'

Updates system guide

**Request body:**
- guide: GuideV1 - Guide to be updated

**Response body:**
Updated GuideV1 object or error 
 
### <a name="operation6"></a> Method: 'POST', route '/guides/delete\_guide\_by\_id'

Deletes system guide specified by its unique id

**Request body:** 
- guide_id: string - unique guide id

**Response body:**
Deleted GuideV1 object or error 
 
