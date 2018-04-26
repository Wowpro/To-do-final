webpackJsonp([0],{"1FXc":function(t,e){},"9+Kz":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),a=s("mvHQ"),i=s.n(a),o={data:function(){return{newTask:{}}},created:function(){this.newTask=this.getNewTask()},methods:{addTask:function(){this.$emit("taskAdded",this.newTask),this.newTask=this.getNewTask()},getNewTask:function(){var t=new Date,e=t.toISOString().substr(0,t.toISOString().indexOf("T"));return console.log(t),{id:null,category:"",dueDate:e,isComplete:!1,priority:"medium",title:""}}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("label",[t._v("Title\n    "),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.newTask.title,expression:"newTask.title",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:t.newTask.title},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.addTask(e):null},input:function(e){e.target.composing||t.$set(t.newTask,"title",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}})]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.newTask.priority,expression:"newTask.priority"}],staticClass:"priority",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.newTask,"priority",e.target.multiple?s:s[0])}}},[s("option",{attrs:{value:"high"}},[t._v("high")]),t._v(" "),s("option",{attrs:{value:"medium"}},[t._v("medium")]),t._v(" "),s("option",{attrs:{value:"low"}},[t._v("low")]),t._v(" "),s("option",{attrs:{value:"blank"}},[t._v("blank")])]),t._v(" "),s("label",[t._v("\n  Due date\n    "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.dueDate,expression:"newTask.dueDate"}],attrs:{type:"date"},domProps:{value:t.newTask.dueDate},on:{input:function(e){e.target.composing||t.$set(t.newTask,"dueDate",e.target.value)}}})]),t._v(" "),s("button",{staticClass:"taskadd",on:{click:t.addTask}},[t._v("Add Task")]),t._v(",\n  "),s("button",{staticClass:"sort",on:{click:function(e){t.sortAscending=!t.sortAscending}}},[t._v("sort")])])},staticRenderFns:[]};var l={name:"App",components:{AddTaskForm:s("VU/8")(o,r,!1,function(t){s("parX")},null,null).exports},data:function(){return{taskList:[]}},created:function(){this.taskList=JSON.parse(localStorage.getItem("taskList"))||[]},methods:{addTask:function(t){this.taskList.push(t),this.saveTaskList()},toggleDone:function(t){t.isComplete=!t.isComplete,this.saveTaskList()},removeTask:function(t){var e=this.taskList.indexOf(t);this.taskList.splice(e,1),this.saveTaskList()},saveTaskList:function(){localStorage.setItem("taskList",i()(this.taskList))}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("h1",{staticClass:"title"},[t._v("Vue Todos")]),t._v(" "),s("nav",[s("ul",[s("li",[s("router-link",{attrs:{to:"/"}},[t._v("All")])],1),t._v(" "),s("li",{staticClass:"Active"},[s("router-link",{attrs:{to:"/active"}},[t._v("Active")])],1),t._v(" "),s("li",[s("router-link",{attrs:{to:"/completed"}},[t._v("Completed")])],1)])]),t._v(" "),s("add-task-form",{on:{taskAdded:t.addTask}}),t._v(" "),s("router-view",{attrs:{tasks:t.taskList},on:{toggleDone:t.toggleDone,removeTask:t.removeTask}})],1)},staticRenderFns:[]};var u=s("VU/8")(l,c,!1,function(t){s("oWYZ")},null,null).exports,m=s("/ocq"),v=s("fU07"),d={props:["tasks"],components:{TaskList:v.default},methods:{toggleDone:function(t){this.$emit("toggleDone",t)},removeTask:function(t){this.$emit("removeTask",t)}}},p={render:function(){var t=this.$createElement,e=this._self._c||t;return e("section",[this.tasks.length>0?[e("TaskList",{attrs:{listTitle:"All Tasks",tasks:this.tasks},on:{toggleDone:this.toggleDone,removeTask:this.removeTask}})]:e("p",[this._v("There are no tasks ... add a new one!")])],2)},staticRenderFns:[]};var k=s("VU/8")(d,p,!1,function(t){s("1FXc")},null,null).exports,f={props:["tasks"],components:{TaskList:v.default},computed:{activeTaskList:function(){return this.tasks.filter(function(t){return!t.isComplete})}},methods:{toggleDone:function(t){this.$emit("toggleDone",t)},removeTask:function(t){this.$emit("removeTask",t)}}},T={render:function(){var t=this.$createElement,e=this._self._c||t;return e("section",[this.activeTaskList.length>0?[e("TaskList",{attrs:{listTitle:"Active Tasks",tasks:this.activeTaskList},on:{toggleDone:this.toggleDone,removeTask:this.removeTask}})]:e("p",{staticClass:"para"},[this._v("There are no active tasks ... Feeling lazy?")])],2)},staticRenderFns:[]};var h=s("VU/8")(f,T,!1,function(t){s("mTlC")},null,null).exports,g={props:["tasks"],components:{TaskList:v.default},computed:{completedTaskList:function(){return this.tasks.filter(function(t){return t.isComplete})}},methods:{toggleDone:function(t){this.$emit("toggleDone",t)},removeTask:function(t){this.$emit("removeTask",t)}}},_={render:function(){var t=this.$createElement,e=this._self._c||t;return e("section",[this.completedTaskList.length>0?[e("TaskList",{attrs:{listTitle:"Completed Tasks",tasks:this.completedTaskList},on:{toggleDone:this.toggleDone,removeTask:this.removeTask}})]:e("p",[this._v("There are no completed tasks ... get to work!")])],2)},staticRenderFns:[]};var w=s("VU/8")(g,_,!1,function(t){s("9+Kz")},null,null).exports;n.a.use(m.a);var y=new m.a({mode:"history",routes:[{path:"/",name:"AllTasksPage",component:k},{path:"/active",name:"Active",component:h},{path:"/completed",name:"Completed",component:w},{path:"*",redirect:"/"}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:y,components:{App:u},template:"<App/>"})},bpML:function(t,e){throw new Error("Module build failed: SyntaxError: C:/Users/mikec/Documents/Web aplications/Midterm/lectures-master/week7/src/components/TaskList.vue: Unexpected token, expected , (103:0)\n\n[0m [90m 101 | [39m  }\n [90m 102 | [39m\n[31m[1m>[22m[39m[90m 103 | [39m\n [90m     | [39m[31m[1m^[22m[39m[0m\n")},fU07:function(t,e,s){"use strict";var n=s("bpML"),a=(s.n(n),s("g41Y"));var i=function(t){s("yb+i")},o=s("VU/8")(n.default,a.a,!1,i,null,null);e.default=o.exports},g41Y:function(t,e,s){"use strict";var n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("h2",[t._v(t._s(t.listTitle))]),t._v(" "),s("div",{staticClass:"toolbar"},[s("label",{attrs:{for:"priority-filter"}},[t._v("Show priority")]),t._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedCategory,expression:"selectedCategory"}],attrs:{name:"category-filter",id:"category-filter"},on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedCategory=e.target.multiple?s:s[0]}}},[s("option",{attrs:{value:""}},[t._v("all")]),t._v(" "),t._l(t.priorityOptions,function(e){return s("option",{key:e.id,domProps:{value:e.id}},[t._v(t._s(e.name))])})],2)]),t._v(" "),s("ul",{staticClass:"task-list"},t._l(t.filteredTasks,function(e){return s("li",{key:e.id,staticClass:"task-item"},[s("span",{staticClass:"far",class:{"fa-circle":!e.isComplete,"fa-check-circle":e.isComplete},on:{click:function(s){t.toggleDone(e)}}}),t._v(" "),s("span",[t._v(t._s(e.title))]),t._v(" "),s("span",[t._v(t._s(e.priority))]),t._v(" "),s("span",{staticClass:"far fa-trash-alt",on:{click:function(s){t.removeTask(e)}}})])}))])},staticRenderFns:[]};e.a=n},mTlC:function(t,e){},oWYZ:function(t,e){},parX:function(t,e){},"yb+i":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.b5f56054c9325299d6b0.js.map