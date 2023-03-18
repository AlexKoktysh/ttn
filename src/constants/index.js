export const contrAgents_default = [
    { index: "0", value: "", label: "Дата отгрузки", date: true, require: true, fieldName: "shipping_date" },
    {
        index: "1",
        value: "",
        label: "Основания отгрузки",
        select: true,
        autocomplete: true,
        currencies: [],
        require: true,
        fieldName: "shipment_grounds",
    },
    { index: "2", header: "Отгрузку разрешил", require: false },
    { index: "3", block: true, fieldName: "allowed_person", require: true, items: [
        {
            index: "4",
            value: "",
            label: "Фамилия",
            class: true,
            select: true,
            controlValue: "",
            controlInput: ["allowed_person_name", "allowed_person_second_name", "allowed_person_org_position"],
            autocomplete: true,
            currencies: [],
            require: true,
            id: "",
            key: "last_name",
            fieldName: "allowed_person_last_name"
        },
        {
            index: "5",
            value: "",
            label: "Имя",
            class: true,
            require: true,
            key: "name",
            fieldName: "allowed_person_name"
        },
        {
            index: "6",
            value: "",
            label: "Отчество",
            class: true,
            require: true,
            key: "second_name",
            fieldName: "allowed_person_second_name"
        },
        {
            index: "7",
            value: "",
            label: "Должность",
            require: true,
            key: "org_position",
            fieldName: "allowed_person_org_position"
        },
    ]},
    { index: "8", header: "Груз сдал", require: false },
    { index: "9", block: true, fieldName: "handed_person", require: true, items: [
        {
            index: "10",
            value: "",
            label: "Фамилия",
            class: true,
            select: true,
            controlInput: ["handed_person_name", "handed_person_second_name", "handed_person_org_position"],
            controlValue: "",
            autocomplete: true,
            currencies: [],
            require: true,
            id: "",
            key: "last_name",
            fieldName: "handed_person_last_name"
        },
        {
            index: "11",
            value: "",
            label: "Имя",
            class: true,
            require: true,
            key: "name",
            fieldName: "handed_person_name"
        },
        {
            index: "12",
            value: "",
            label: "Отчество",
            class: true,
            require: true,
            key: "second_name",
            fieldName: "handed_person_second_name"
        },
        {
            index: "13",
            value: "",
            label: "Должность",
            require: true,
            key: "org_position",
            fieldName: "handed_person_org_position"
        },
    ] },
    { index: "14", header: "Товар к доставке принял", require: false },
    { index: "15", block: true, fieldName: "received_person", require: true, items: [
        { 
            index: "16",
            value: "",
            label: "Фамилия",
            class: true,
            select: true,
            autocomplete: true,
            currencies: [],
            controlInput: ["rights_number", "rights_date", "received_person_name", "received_person_second_name", "received_person_org_position"],
            controlValue: "",
            require: true,
            id: "",
            key: "last_name",
            fieldName: "received_person_last_name"
        },
        { 
            index: "17",
            value: "",
            label: "Имя",
            class: true,
            require: true,
            key: "name",
            fieldName: "received_person_name"
        },
        { 
            index: "18",
            value: "",
            label: "Отчество",
            class: true,
            require: true,
            key: "second_name",
            fieldName: "received_person_second_name"
        },
        {
            index: "19",
            value: "",
            label: "Должность",
            require: true,
            key: "org_position",
            fieldName: "received_person_org_position"
        },
    ]},
    { index: "20", value: "", label: "Доверенность", require: true, disabled: true, fieldName: "rights_number"},
    { index: "21", value: "", label: "Дата доверенности", date: true, require: true, disabled: true, fieldName: "rights_date"},
    { index: "22", value: "", label: "Серия бланка", require: true, fieldName: "blank_series" },
    { index: "23", value: "", label: "Номер бланка", require: true, fieldName: "blank_number", disabled: false },
    { index: "24", value: "", label: "С товаром переданы документы", require: false, fieldName: "documents_handed"},
];
export const commodityDictionary_default = [
    {
        index: "0",
        value: "",
        autocomplete: true,
        select: true,
        label: "Наименование товара",
        currencies: [],
        controlInput: ["product_price", "measure"],
        controlValue: "",
        fieldName: "product_name",
        require: true,
        ttn_max_qty: "",
    },
    { index: "1", value: "", label: "Единица измерения", fieldName: "measure", require: true },
    { index: "2", value: "", label: "Количество", fieldName: "product_qty", require: true },
    { index: "3", value: "", label: "Цена за ед.,", fieldName: "product_price", require: true },
    { index: "4", value: "", label: "Стоимость по количеству,", fieldName: "product_cost", require: true },
    { index: "5", value: "", label: "Ставка НДС, %", fieldName: "ttn_product_vat", require: true },
    { index: "6", value: "", label: "Сумма НДС,", fieldName: "ttn_product_vat_sum", require: true },
    { index: "7", value: "", label: "Стоимость с НДС,", fieldName: "product_cost_with_vat", require: true },
    { index: "8", value: "", label: "Примечания (необязательное)", fieldName: "notes", require: false },
    { index: "9", value: "", label: "Страна ввоза (необязательное)", fieldName: "country_import", require: false },
    { index: "10", value: "", label: "Масса (необязательное)", fieldName: "product_weight", require: false },
    { index: "11", value: "", label: "Количество грузовых мест (необязательное)", fieldName: "qty_cargo_place", require: false },
];
export const typeFields = [
    { index: "0", value: "1", label: "Договор", checked: true, server: "dogovor" },
    { index: "1", value: "2", label: "Счет", checked: false, server: "invoice" },
];
export const availableTransport_default = [
    {
        index: "0",
        value: "",
        label: "Марка автомобиля",
        select: true,
        autocomplete: true,
        currencies: [],
        controlInput: ["last_name", "driver_unp", "loading_point_address", "unloading_point_address", "waybill_number", "cargo"],
        controlValue: "",
        require: true,
        fieldName: "car_model",
    },
    {
        index: "1",
        value: "",
        label: "Гос. номер",
        require: true,
        fieldName: "car_number",
        select: true,
        autocomplete: true,
        currencies: [],
        controlValue: "",
    },
    { index: "2", value: "", label: "Модель прицепа", require: false, fieldName: "trailer_model", },
    { index: "3", value: "", label: "Номер прицепа", require: false, fieldName: "trailer_number", },
    { index: "4", value: "", label: "ФИО водителя", require: true, fieldName: "last_name", },
    { index: "5", value: "", label: "УНП перевозчика", require: false, fieldName: "driver_unp", },
    { index: "6", value: "", label: "Пункт погрузки", require: true, fieldName: "loading_point_address", },
    { index: "7", value: "", label: "Пункт разгрузки", require: true, fieldName: "unloading_point_address", },
    { index: "8", value: "", label: "Номер путевого листа", require: false, fieldName: "waybill_number", },
    { index: "9", value: "", label: "Вес груза", require: false, fieldName: "cargo", },
];

export const steps = [
    { index: "0", value: "1", label: "1" },
    { index: "1", value: "2", label: "2" },
];