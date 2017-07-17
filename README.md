OnlineJudge
=====================

Preview:
![Preview](http://i.imgur.com/zILxBDR.jpg)

deploy
-------------
```
cd node_modules/simple-judger/esb
make runtests
cd ../../../
npm start <PORT>
```

db.json
-------------
```javascript
{
  "config": {
    "judgemode": 1, 
	/*
	 * mode 1: judge in sandbox(linux)
	 * mode 2: judge in remote server
	 * mode 3: judge in local machine(no sandbox)
	 * mode 1 and 2 use "simple-judger" module
	*/
    "judge": {
      "url": "http://127.0.0.1:7777",//mode 2 required!
	  /*other options see https://github.com/maple3142/Simple-Judger */
      "timelimit": 1000,
      "compile": "g++ -o {dest} {source}",
      "result": {
        "Accepted": "AC",
        "Runtime_Error": "RE",
        "Time_Limit_Exceeded": "TLE",
        "Compile_Error": "CE",
        "Wrong_Answer": "WA",
        "System_Error": "SE"
      },
      "debug": false//if true, simple-judger will log extra information
    },
    "dangerous_judge": { /* dangerours and has many bug, but can use on windows for testing */
      "sourceName": "%s.cpp",
      "destName": "%s.exe",
      "compileCommand": "g++ -o %s %s",
      "timeLimit": 1000
    }
  },
  "users": [//users array
    {//user object
      "account": "admin",
      "password": "admin",
      "id": "0.009869668518401209",//id will regenerate randomly on every restart
      "ok": [//means which problem this user has Accepted
        true,
        false,
        true
      ]
    }
  ],
  /*
   * problems array, don't modifiy it
   * it will auto generate by files in "problems" and "problems_cases" folder
  */
  "pbs": [
    {
      "content": "<h1 id=\"abproblem\">A+B Problem</h1>\n<h4 id=\"\">輸入</h4>\n<p>A B</p>\n<h4 id=\"-1\">輸出</h4>\n<p>A+B</p>",
      "problem": "A+B",
      "id": 0,
      "in": "2 9\n",
      "out": "11"
    },
    {
      "content": "<h1 id=\"helloworld\">Hello World</h1>\n<p>輸出一個\"Hello World\"</p>",
      "problem": "問題A",
      "id": 1,
      "in": "",
      "out": "Hello World"
    },
    {
      "content": "<h1 id=\"b\">問題B</h1>\n<p>輸入有一個字串，把他輸出出來</p>",
      "problem": "問題B",
      "id": 2,
      "in": "asds\n",
      "out": "asds"
    }
  ]
}
```
