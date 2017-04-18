# Seneca Protocol (version 1) <br/> Guides Microservice

Guides microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8080, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'guides',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [GuidePageV1 class](#class1)
* [GuideV1 class](#class2)
* [cmd: 'get_guides'](#operation1)
* [cmd: 'get_random_guide'](#operation2)
* [cmd: 'get_guide_by_id'](#operation3)
* [cmd: 'create_guide'](#operation4)
* [cmd: 'update_guide'](#operation5)
* [cmd: 'delete_guide_by_id'](#operation6)

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

### <a name="operation1"></a> Cmd: 'get_guides'

Retrieves a list of guides by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - type: string - (optional) guide type
  - app: string - (optional) application name
  - version: string - (optional) application version
  - status: string - (optional) editing status
  - tags: [string] - search tags
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<GuideV1> - retrieved page with Guide objects

### <a name="operation2"></a> Cmd: 'get\_random\_guide'

Retrieves a random guide from filtered resultset

**Arguments:** 
- filter: object - filter parameters
  - type: string - (optional) guide type
  - app: string - (optional) application name
  - version: string - (optional) application version
  - status: string - (optional) editing status
  - tags: [string] - search tags

**Returns:**
- err: Error - occured error or null for success
- result: GuideV1 - random Guide or null if nothing was found

### <a name="operation3"></a> Cmd: 'get\_guide\_by_id'

Retrieves guide by its unique id. 

**Arguments:** 
- guide_id: string - unique guide id

**Returns:**
- err: Error - occured error or null for success
- result: GuideV1 - retrieved Guide object

### <a name="operation4"></a> Cmd: 'create_guide'

Creates a new system guide.

**Arguments:** 
- guide: GuideV1 - a new annoucement to be created

**Returns:**
- err: Error - occured error or null for success
- result: GuideV1 - created Guide object

### <a name="operation5"></a> Cmd: 'update_guide'

Updates guide.

**Arguments:** 
- guide: GuideV1 - new guide values (partial updates are supported)

**Returns:**
- err: Error - occured error or null for success
- result: GuideV1 - updated Guide object

### <a name="operation6"></a> Cmd: 'delete\_guide\_by_id'

Deletes system guide specified by its unique id.

**Arguments:** 
- guide_id: string - unique guide id

**Returns:**
- err: Error - occured error or null for success
- result: GuideV1 - deleted Guide object


