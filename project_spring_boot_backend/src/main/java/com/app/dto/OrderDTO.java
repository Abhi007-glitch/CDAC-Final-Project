package com.app.dto;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderDTO {
   private Long custId;
   private ArrayList<CustomerOrderItemRecord> orders;
}
