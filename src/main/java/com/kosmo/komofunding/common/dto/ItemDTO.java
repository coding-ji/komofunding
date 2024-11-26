package com.kosmo.komofunding.common.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemDTO {
    private String itemName;
    private Long itemPrice;
    private Long itemAmount;
}
