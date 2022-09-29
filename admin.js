function Validator(option) {

    var listSelectors = {};

    function validate(selectorElement, rule) {
        var errorElement = selectorElement.parentElement.querySelector(option.message);
        var errorMessage;

        var rules = listSelectors[rule.selector];



        for (var i = 0; i < rules.length; ++i) {


            errorMessage = rules[i](selectorElement.value);

            if (errorMessage) {
                break;
            }


        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
        } else {
            errorElement.innerText = '';
        }
    }

    var formElement = document.querySelector(option.form);
    //console.log(formElement);

    if (formElement) {

        formElement.onsubmit = function(e){
            e.preventDefault();

            option.rules.forEach(rule => {
                var selectorElement = formElement.querySelector(rule.selector);
                validate(selectorElement, rule);
        })
    }


        option.rules.forEach(rule => {
            var selectorElement = formElement.querySelector(rule.selector);

            if (Array.isArray(listSelectors[rule.selector])) {
                listSelectors[rule.selector].push(rule.check);
            } else {
                listSelectors[rule.selector] = [rule.check];
            }


            //console.log(selectorElement);

            selectorElement.onblur = function () {
                validate(selectorElement, rule);

                selectorElement.oninput = function () {
                    var errorElement = selectorElement.parentElement.querySelector(option.message);
                    errorElement.innerText = '';
                }

                console.log(listSelectors);

            }



        });
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        check: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
        }
    }
};

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        check: function (value) {
            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return (value.match(regex)) ? undefined : 'Vui lòng nhập email'
        }
    }
};

Validator.isPassword = function (selector, minLength) {
    return {
        selector: selector,
        check: function (value) {
            return value.length >= minLength ? undefined : 'Vui lòng nhập trên ' + minLength + ' kí tự';
        }
    }
}

Validator.isConfirm = function (selector, selectorPassword, message) {
    return {
        selector: selector,
        check: function (value) {
            return value === selectorPassword() ? undefined : message || 'Giá trị nhập không chính xác ';
        }
    }
}