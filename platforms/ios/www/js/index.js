/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log("device ready");
         app.testjson();
        //app.receivedEvent('deviceready');
    },
    testjson:  function (){
//        http://echo.jsontest.com/key/value/one/two
        $.ajax({
            url: "http://echo.jsontest.com/key/value/one/two",
            cache: false
        })
            .done(function( data ) {
                console.log(data);
            });
    },
    test: function() {
        console.log("test")
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        //db.transaction(app.populateDB, app.errorCB, app.successCB);
        db.transaction(app.queryDB, app.errorCB);
    },
    populateDB:function (tx) {
        alert("populate");
        tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    },

    errorCB: function (tx, err) {
        alert("Error processing SQL: " + err);
    },

    successCB: function () {
        alert("success!");
    } ,
    queryDB: function (tx) {
        tx.executeSql('SELECT * FROM DEMO', [], app.querySuccess, app.errorCB);
    } ,

    querySuccess: function (tx, results) {
            console.log(results.rows)
            for (var i =0; i < results.rows.length; i++)
            {
                console.log(results.rows.item(i))
            }
//        // this will be empty since no rows were inserted.
//        console.log("Insert ID = " + results.insertId);
//        // this will be 0 since it is a select statement
//        console.log("Rows Affected = " + results.rowAffected);
//        // the number of rows returned by the select statement
//        console.log("Insert ID = " + results.rows.length);
    } ,
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};
