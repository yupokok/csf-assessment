package vttp.batch4.csf.ecommerce.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature

  public static final String SQL_CREATE_PURCHASE_ORDER = """
    insert into orders(orderId, name, date, address, priority, comments, cart)
       values (?, ?, ?, ?, ?, ?, ?)
 """;

  public void create(Order order) {
      template.update(SQL_CREATE_PURCHASE_ORDER
            , order.getOrderId(), order.getName(), order.getAddress(), order.getPriority(), order.getComments(), order.getCart().toString());
   }
  }
