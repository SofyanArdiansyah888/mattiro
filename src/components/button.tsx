import {PlusCircledIcon} from "@radix-ui/react-icons";
import {Button} from "antd";
import React, {MouseEventHandler} from "react";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {FileExcelOutlined, FilterOutlined, PrinterOutlined} from "@ant-design/icons";

interface IButton {
    handleClick: MouseEventHandler<HTMLElement> | undefined
    size?: SizeType
}

export function TambahButton({
                                 handleClick,
                                 size = "middle"
                             }: IButton) {
    return <Button
        icon={<PlusCircledIcon/>}
        type={"primary"}
        size={size}
        onClick={handleClick}
    >
        Tambah
    </Button>
}

export function FilterButton({handleClick}:IButton){
    return     <Button
        icon={<FilterOutlined/>}
        onClick={handleClick}>
        Filter
    </Button>
}

export function PrintButton({handleClick}:IButton){
    return   <Button
        icon={<FileExcelOutlined />}
        onClick={handleClick}
        className={"!bg-green-800 !border-green-800 !text-white"}
    >
        Excel
    </Button>
}