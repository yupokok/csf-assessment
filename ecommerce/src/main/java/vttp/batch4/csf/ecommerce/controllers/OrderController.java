package vttp.batch4.csf.ecommerce.controllers;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping(path = "/api")
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path = "/order", consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public ResponseEntity<String> postOrder(@RequestBody String payload) {

    System.out.printf(">>> POST payload: %s\n", payload);
    JsonReader reader = Json.createReader(new StringReader(payload));
    JsonObject json = reader.readObject();

    Order order = new Order();
    order.setAddress(json.getString("address"));
    order.setName(json.getString("name"));
    order.setComments(json.getString("comments"));
    order.setPriority(json.getBoolean("priority"));
    order.getOrderId();

    poSvc.createNewPurchaseOrder(order);
     JsonObject resp = Json.createObjectBuilder()
      .add("status", 200)
      .build();
      
      return ResponseEntity.ok(resp.toString());
  }
}
