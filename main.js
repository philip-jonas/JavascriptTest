{
    // Variables
    let tab_containers = null;
    let tab_buttons = null;
    let tab_selected = null;

    /**
     * Hide tab containers
     * @returns void;
     */
    const hide_tab_containers = () => {
        if (tab_containers) {
            for(let i = 0; i < tab_containers.length; i ++){
                if (tab_containers[i] !== tab_selected) {
                    tab_containers[i].style.display = 'none';
                }
            }
        }
    }

    /**
     * Initialize the tab button selectors
     * @returns void;
     */
    const init_tab_buttons = () => {
        add_event_listenener('click', "tab-selector-button", toggle_select_tab);
    }

    /**
     * Toggle the selected tab to show and hide
     * @param {Object} event 
     */
    const toggle_select_tab = (event) => {
        if (event.target) {
            
            let tab_id = event.target.value;

            if (tab_selected) {
                tab_selected.style.display = 'none';
            }

            tab_selected = document.getElementById(tab_id);
            tab_selected.style.display = 'block';
        }
    }

    /**
     * Helper - Get dom elment by class
     * @param {string} class_name
     * @returns DOM object
     */
    const get_element_by_class = (class_name) => {
        return document.getElementsByClassName(class_name);
    }

    /**
     * Helper - Get dom elment by id
     * @param {string} id
     * @returns DOM object
     */
    const get_element_by_id = (id) => {
        return document.getElementById(id);
    }

    /**
     * Helper - Add click events based on 
     * @param {*} event_action 
     * @param {String} target_listener 
     * @param {Function} callback 
     */
    const add_event_listenener = (event_action, target_listener, callback) => {
        const elements = document.getElementsByClassName(target_listener);
        for(let i = 0; i < elements.length; i ++){
            elements[i].addEventListener(event_action, (event) => {
                callback(event);
            });
        }
    }

    /**
     * Helper - gets the number of days for a month in a selected year
     * @param {Number} month 
     * @param {Number} year 
     */
    const get_number_of_days_in_month = (month, year) => {
        return new Date(year, month, 0).getDate(); 
    }

    /**
     * Helper - Creates a options document fragment
     * @param {Array} list 
     */
    const create_options_fragment = (list, selected_option) => {
        const options = document.createDocumentFragment();
        for (let i = 0; i < list.length; i++) {
            let val = list[i] || i+1;
            let option = document.createElement('option');
            if (selected_option === val) {
                option.setAttribute('selected', 'selected');
            }

            option.textContent = val;
            option.setAttribute('value', val);
            options.appendChild(option);
        }

        return options;
    }

    /**
     * Sets the days in the day selector for the date picker tab
     * @param {NodeElement} day_select_list 
     */
    const set_date_picker_days = (day_select_list) => {
        const date = new Date();
        let days = get_number_of_days_in_month(date.getMonth() + 1, date.getFullYear());
        const fragment = create_options_fragment(new Array(days), date.getDate());

        if (fragment) {
            day_select_list.appendChild(fragment);
        }
    }

    /**
     * Initialize test setup
     * @returns void;
     */
    const init = () => {
        // Set the main dom elements
        tab_containers = get_element_by_class("tab-element");
        tab_buttons = get_element_by_class("tab-selector-button");
        tab_selected = get_element_by_id('date-picker');

        const day_select_list = get_element_by_id('day');

        // Set hidden states of tab containers
        hide_tab_containers();
        init_tab_buttons();
        set_date_picker_days(day_select_list);
    }

    // Inittialize script
    init();
}