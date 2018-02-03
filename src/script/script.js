window.onload = function(){

    let JSONManager = function(){
        this.load = function(url, callback){
            var xobj = new XMLHttpRequest();
            var response = "";

            xobj.overrideMimeType("application/json");
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200"){
                   callback(xobj.responseText);
                }
            };
            xobj.send(null); 
            return response;
        };

        this.parse = function(string){
            return JSON.parse(string);
        }
    }


    let App = function(){
        this.typeTPLs = document.querySelectorAll(".js-type");
        this.productTPL = document.querySelector(".js-product-tpl");

        this.productElements = [];

        this.data = {};

        this.init = function(){
            let self = this;
            let jsonManager = new JSONManager();

            jsonManager.load("json/data.json", function(data){
                self.data = jsonManager.parse(data);
                self.prepare();
            });
        }

        this.prepare = function(){
            let self = this;
            let cats = self.data.cats;

            cats.forEach(function(item){
                let prod = document.importNode(self.productTPL, true);
                let type = document.importNode(self.typeTPLs[item.type], true);

                prod.content.querySelector(".product__info").appendChild(type.content);
                prod.content.querySelector(".product__img").src = item.img;
                prod.content.querySelector(".product__name").innerHTML = item.name;
                prod.content.querySelector(".product__price").innerHTML = item.price;

                self.productElements.push(prod);
            });
            self.render();
        }

        this.render = function(){
            let self = this; 
            let grid = document.querySelector(".js-grid");

            self.productElements.forEach(function(item){
                grid.appendChild(document.importNode(item.content, true));
            });
        }
    }


    let app = new App();
    app.init();
    
}