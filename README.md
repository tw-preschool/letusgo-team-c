### Base line of Let's Go server

This is a simple RESTFul server for Let' Go online shop server, it's written in Ruby for now. It contains some essential parts for get started with Web development very quickly.

1.    [Sinatra](http://www.sinatrarb.com/) as Web Server
2.    [ActiveRecord](http://api.rubyonrails.org/classes/ActiveRecord/Base.html) as ORM
3.    Sqlite3 as database (single file database)
3.    [RSpec](http://rspec.info/) as unit test framework
4.    [Rake](https://github.com/jimweirich/rake) as build tools

#### Setup Environment

Since it's basically a Ruby Web application, you should firstly have Ruby installed. [RVM](http://rvm.io/) is choosen as the Ruby Installer. In most cases, simply type:

```sh
$ curl -sSL https://get.rvm.io | bash -s stable 
```

will do the installation automatically for you. If you want to do some customization, here is a [detailed guide](http://rvm.io/rvm/install). 

Once the Ruby is installed, you need clone this repo to you local enviroment:

```sh
$ git clone git@github.com:abruzzi/letusgo-server.git
$ cd letusgo-server
```

And then you should be able to see something like:

```
ruby-1.9.3-p545 is not installed.
To install do: 'rvm install ruby-1.9.3-p545'
```

Try to following the instruction, and install the correct version of ruby. After that you need install the `bundler` gem by yourself, and use `bundler` to maintain other dependencies. Install `bundler` itself is easy:

```sh
$ gem install bundler
```

Then you can use command `bundle` to install all other `gems`:

```sh
$ bundle install
```

Once all the dependencies are installed, you are done of the `environment` part

#### Application setup

Now we will start to do the application setup. Firstly, do the database setup like this:

```sh
./setup.sh
```

After this, you should see there are 2 files end with `.sqlite3` in the folder `db/`:

```sh
$ ls -al db/*.sqlite3
-rw-r--r--  1 jtqiu  staff  20480 Nov 16 13:29 db/development.sqlite3
-rw-r--r--  1 jtqiu  staff  20480 Nov 16 13:48 db/test.sqlite3
```

Then you can lunch your application by using `shotgun` like this:

```sh
$ shotgun
```

And you should see something like this:

```
== Shotgun/WEBrick on http://127.0.0.1:9393/
[2014-11-16 14:22:45] INFO  WEBrick 1.3.1
[2014-11-16 14:22:45] INFO  ruby 1.9.3 (2014-02-24) [x86_64-darwin14.0.0]
[2014-11-16 14:22:45] INFO  WEBrick::HTTPServer#start: pid=8889 port=9393
```

that means the application is started successfully, type `http://127.0.0.1:9393/products` in your browser and you should see an empty array like `[]`, then you are done.

Use `Ctrl-C` to terminate the application, try to run the following command to test the application:

```sh
$ RACK_ENV=test rake specs
```

And you should see 3 test cases are passing:

```
...

Finished in 0.11592 seconds (files took 0.60523 seconds to load)
3 examples, 0 failures
```

That's it.

