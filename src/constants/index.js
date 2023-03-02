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
    {
        index: "2",
        value: "",
        label: "Отгрузку разрешил",
        select: true,
        currencies: [],
        require: true,
        fieldName: "allowed_person_id"
    },
    { 
        index: "3",
        value: "",
        label: "Груз сдал",
        select: true,
        currencies: [],
        require: true,
        fieldName: "handed_person_id"
    },
    { 
        index: "4",
        value: "",
        label: "Товар к доставке принял",
        select: true,
        currencies: [],
        controlInput: ["rights_number", "FIO"],
        controlValue: "",
        require: true,
        fieldName: "received_person_id"
    },
    { index: "5", value: "", label: "Доверенность", require: true, fieldName: "rights_number"},
    { index: "6", value: "", label: "ФИО", require: true, fieldName: "FIO" },
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
export const tnOrTtnField = [
    { index: "0", value: "1", label: "ТН", checked: false },
    { index: "1", value: "2", label: "ТТН", checked: false },
];
export const templateViewField = [
    { index: "0", value: "1", label: "Вертикально", checked: false },
    { index: "1", value: "2", label: "Горизонтально", checked: false },
];
export const availableTransport_default = [
    {
        index: "0",
        value: "",
        label: "Транспорт",
        select: true,
        autocomplete: true,
        currencies: [],
        controlInput: ["car_number", "last_name", "driver_unp", "loading_point_address", "unloading_point_address", "waybill_number", "cargo"],
        controlValue: "",
        require: true,
        fieldName: "car_model",
    },
    { index: "1", value: "", label: "Марка и гос. номер", require: true, fieldName: "car_number", },
    { index: "2", value: "", label: "ФИО водителя", require: true, fieldName: "last_name", },
    { index: "3", value: "", label: "УНП перевозчика", require: false, fieldName: "driver_unp", },
    { index: "4", value: "", label: "Пункт погрузки", require: true, fieldName: "loading_point_address", },
    { index: "5", value: "", label: "Пункт разгрузки", require: true, fieldName: "unloading_point_address", },
    { index: "6", value: "", label: "Номер путевого листа", require: false, fieldName: "waybill_number", },
    { index: "7", value: "", label: "Вес груза", require: false, fieldName: "cargo", },
];

export const steps = [
    { index: "0", value: "1", label: "1" },
    { index: "1", value: "2", label: "2" },
];