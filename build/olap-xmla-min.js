(function e(t){var e;typeof exports!="undefined"?e=exports:e=t.olapXmla={},e.Connection=function(t){window.location.origin||(window.location.origin=window.location.protocol+"//"+window.location.host);var n=t||{};olap.Connection.call(this,n),this.xmla=new Xmla({}),this.xmla.setOptions({async:!1,url:n.url||window.location.origin+"/"+window.location.pathname.split("/")[1]+"/Xmla",roles:n.roles||[],DataSourceInfo:"Provider="+n.provider||"Mondrian;DataSource="+n.datasource||"Pentaho"})},inheritPrototype(e.Connection,olap.Connection),e.Connection.prototype.executeOlapQuery=function(t){var n=this,r={},i,s,o,u,a;r[Xmla.PROP_FORMAT]=Xmla.PROP_FORMAT_MULTIDIMENSIONAL;if(!t.catalog||t.catalog==="")throw new Error("An MDX query must have a catalog specified in options");r[Xmla.PROP_CATALOG]=t.catalog,s=n.xmla.execute({statement:t.mdx,properties:r,success:function(n,r,s){var o=function(t){var n,r,i,s,o,u,a,f={hierarchies:[],positions:[]},l;for(n=0,r=t.hierarchies.length;n<r;n++)s=t.hierarchies[n],f.hierarchies.push({HIERARCHY_UNIQUE_NAME:s.name});for(n=0,r=t.positions.length;n<r;n++){o=t.positions[n],u={};for(i in o)a=o[i],u[i]={MEMBER_UNIQUE_NAME:a.UName,MEMBER_CAPTION:a.Caption,LEVEL_UNIQUE_NAME:a.LName,LEVEL_NUMBER:a.LNum};f.positions.push(u)}return f},u=s.fetchAsObject(),a={CUBE_NAME:u.cubeName,axes:[],cells:[],SLICER:{}},f={},l;for(var c=0,h=u.axes.length;c<h;c++)f=u.axes[c],a.axes.push(o(f));a.SLICER=o(u.filterAxis);for(c=0,h=u.cells.length;c<h;c++)l=u.cells[c],a.cells.push({value:l.Value,formattedValue:l.FmtValue,formatString:l.FormatString,ordinal:l.ordinal});return i=new olap.CellSet(a,t.catalog),typeof t.success=="function"&&t.success(i),i}})},e.Connection.prototype.addDataSource=function(n,r){var i=new e.Datasource(n,this);return olap.Connection.prototype.addDataSource.call(this,i),i},e.Connection.prototype.fetchOlapDatasources=function(n){var r=this,i,s,o;return this.xmla.discoverDataSources({success:function(i,u,a){while(s=a.fetchAsObject())o=new e.Datasource({DATA_SOURCE_DESCRIPTION:s.DataSourceDescription||"",DATA_SOURCE_NAME:s.DataSourceName||"",DATA_SOURCE_INFO:s.DataSourceInfo||"",PROVIDER_NAME:s.ProviderName||"",PROVIDER_TYPE:s.ProviderType||"",URL:s.URL||"",AUTHENTICATION_MODE:s.AuthenticationMode||""},r),r.addDataSource.call(r,o);a.close(),delete a,n.call(r,r.sources)}}),r.soures},e.Datasource=function(t,n){olap.Datasource.call(this,t,n)},inheritPrototype(e.Datasource,olap.Datasource),e.Datasource.prototype.fetchCatalogs=function(){var t={},n,r,i=this;n=this.connection.xmla.discoverDBCatalogs({properties:t});if(n.hasMoreRows())while(r=n.fetchAsObject())this.addCatalog(r);return this.catalogs},e.Datasource.prototype.addCatalog=function(n,r){var i=new e.Catalog(n,this);return olap.Datasource.prototype.addCatalog.call(this,i),i},e.Catalog=function(t,n){olap.Catalog.call(this,t,n)},inheritPrototype(e.Catalog,olap.Catalog),e.Catalog.prototype.fetchCubes=function(){var n={},r,i,s=this;n[Xmla.PROP_CATALOG]=this.CATALOG_NAME,r=this.datasource.connection.xmla.discoverMDCubes({properties:n});if(r.hasMoreRows())while(i=r.fetchAsObject())this.addCube(new e.Cube(i,this));return this.cubes},e.Catalog.prototype.addCube=function(n,r){var n=new e.Cube(n,this);return olap.Catalog.prototype.addCube.call(this,n),n},e.Cube=function(t,n){olap.Cube.call(this,t,n)},inheritPrototype(e.Cube,olap.Cube),e.Cube.prototype.getDimensions=function(n,r){var i={},s,o,u=this;i[Xmla.PROP_CATALOG]=this.CATALOG_NAME;var a={};a.CATALOG_NAME=this.CATALOG_NAME,a.CUBE_NAME=this.CUBE_NAME,s=this.catalog.datasource.connection.xmla.discoverMDDimensions({properties:i,restrictions:a});if(s.hasMoreRows())while(o=s.fetchAsObject())this.addDimension(new e.Dimension(o,this),r);return s.close(),this.dimensions},e.Cube.prototype.fetchMeasures=function(){var n={},r,i,s=this;n[Xmla.PROP_CATALOG]=this.CATALOG_NAME;var o={};o.CATALOG_NAME=this.CATALOG_NAME,o.CUBE_NAME=this.CUBE_NAME,r=this.catalog.datasource.connection.xmla.discoverMDMeasures({properties:n,restrictions:o});if(r.hasMoreRows())while(i=r.fetchAsObject())this.addMeasure(new e.Measure(i,this));return r.close(),this.measures},e.Dimension=function(t,n){olap.Dimension.call(this,t,n)},e.Dimension.getDimensions=function(n){var r={},i,s,o=[],u={};i=n.connection.xmla.discoverMDDimensions({restrictions:u});if(i.hasMoreRows())while(s=i.fetchAsObject())o.push(new e.Dimension(s));return o},inheritPrototype(e.Dimension,olap.Dimension),e.Dimension.prototype.getHierarchies=function(n,r){var i={},s,o,u=this;i[Xmla.PROP_CATALOG]=this.cube.catalog.CATALOG_NAME;var a={};a.CATALOG_NAME=this.cube.catalog.CATALOG_NAME,a.CUBE_NAME=this.cube.CUBE_NAME,a.DIMENSION_UNIQUE_NAME=this.DIMENSION_UNIQUE_NAME,s=this.cube.catalog.datasource.connection.xmla.discoverMDHierarchies({properties:i,restrictions:a});if(s.hasMoreRows())while(o=s.fetchAsObject())this.addHierarchy(new e.Hierarchy(o,this),r);return s.close(),this.hierarchies},e.Hierarchy=function(t,n){olap.Hierarchy.call(this,t,n)},e.Hierarchy.getHierarchies=function(n){var r={},i,s,o=this,u=[],a={};i=n.xmla.discoverMDHierarchies({restrictions:a});if(i.hasMoreRows())while(s=i.fetchAsObject())u.push(new e.Hierarchy(s));return u},inheritPrototype(e.Hierarchy,olap.Hierarchy),e.Hierarchy.prototype.getLevels=function(n,r){var i={},s,o,u=this;i[Xmla.PROP_CATALOG]=this.dimension.cube.catalog.CATALOG_NAME;var a={};a.CATALOG_NAME=this.dimension.cube.catalog.CATALOG_NAME,a.CUBE_NAME=this.dimension.cube.CUBE_NAME,a.DIMENSION_UNIQUE_NAME=this.dimension.DIMENSION_UNIQUE_NAME,a.HIERARCHY_UNIQUE_NAME=this.HIERARCHY_UNIQUE_NAME,s=this.dimension.cube.catalog.datasource.connection.xmla.discoverMDLevels({properties:i,restrictions:a});if(s.hasMoreRows())while(o=s.fetchAsObject())this.addLevel(new e.Level(o,this),r);return s.close(),this.levels},e.Level=function(t,n){olap.Level.call(this,t,n)},e.Level.getLevels=function(n){var r={},i,s,o=this,u=[],a={};i=n.xmla.discoverMDLevels({restrictions:a});if(i.hasMoreRows())while(s=i.fetchAsObject())u.push(new e.Level(s,this));return u},inheritPrototype(e.Level,olap.Level),olap.Level.prototype.getMembers=function(n,r){var i={},s,o,u=this;i[Xmla.PROP_CATALOG]=this.hierarchy.dimension.cube.catalog.CATALOG_NAME;var a={};a.CATALOG_NAME=this.hierarchy.dimension.cube.catalog.CATALOG_NAME,a.CUBE_NAME=this.hierarchy.dimension.cube.CUBE_NAME,a.DIMENSION_UNIQUE_NAME=this.hierarchy.dimension.DIMENSION_UNIQUE_NAME,a.HIERARCHY_UNIQUE_NAME=this.hierarchy.HIERARCHY_UNIQUE_NAME,a.LEVEL_UNIQUE_NAME=this.LEVEL_UNIQUE_NAME,s=this.hierarchy.dimension.cube.catalog.datasource.connection.xmla.discoverMDMembers({properties:i,restrictions:a});if(s.hasMoreRows())while(o=s.fetchAsObject())this.addMember(new e.Member(o,this),r);return s.close(),this.members},e.Member=function(t,n){olap.Member.call(this,t,n)},inheritPrototype(e.Member,olap.Member),e.Measure=function(t,n){olap.Measure.call(this,t,n)},e.Measure.getMeasures=function(t){var n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y=[];return t.getOlapDatabases(function(e){for(n in e){r=e[n],i=r.getCatalogs();for(n in i){s=i[n],o=s.getCubes();for(n in o)u=o[n],m=u.getMeasures(),y=y.concat(m)}}}),y},inheritPrototype(e.Measure,olap.Measure),e.Query=function(t,n,r,i){olap.Query.call(this,t,n),this.connection=r||{},this.catalog=i||{}},inheritPrototype(e.Query,olap.Query),e.Query.prototype.execute=function(t){var n=this,r={},i,s,o,u,a,f;i=this.getMDX(),o=this.connection.executeOlapQuery({mdx:i,catalog:this.catalog,success:function(e){typeof t=="function"&&(t.call(this,e),delete e)}})}})(this);
