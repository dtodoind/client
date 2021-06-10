import React from "react";
import "./ShippingInfo.scss";
function ShippingInfo() {
  return (
    <div className="shipping-container">
      <div className="shipping-title">
        <p> Condiciones de Envio</p>
      </div>
      <div className="shipping-text">
        <h6>¿Cuándo voy a recibir mi pedido?</h6>
        Los pedidos son entregados a través del correo Andreani en toda la
        República Argentina.
        <br></br>
        <p>
          Envío estándar: El plazo de entrega es dentro de los 10 días hábiles
          posteriores a tu compra, de lunes a viernes entre las 9 y 18 hs.
        </p>
        <br></br>
        <h6> Envío a Sucursal Andreani:</h6>
        <p>
          El pedido estará listo en la sucursal del correo de tu preferencia en
          los próximos 8 días hábiles. En lo que refiere a envíos a sucursal de
          Andreani, deberás retirar tu pedido dentro de los siguientes 7 días
          corridos desde el día que llegó a destino. En caso que el paquete no
          sea retirado dentro de ese plazo, Andreani lo devolverá al remitente.
          Para que te volvamos a reenviar el pedido deberás volver a abonar el
          costo de envío. (*) Aclaración si hay un feriado se considera la
          compra como si fuera realizada el siguiente día hábil. Durante
          acciones especiales como Hot Sale, Cybermonday y promociones en el
          sitio web los tiempos de procesamiento, envío y entrega pueden verse
          afectados. Oportunamente se informará a los clientes de las demoras
          respectivas.
        </p>
        <br></br>
        <h6> Pick Up</h6>
        <p>
          Podés elegir retirar tu pedido de manera gratuita por diferentes
          locales DTODO tanto en CABA como en GBA. Tu pedido estará listo en el
          local dentro de los próximos 3 a 5 días hábiles. Te enviaremos un
          whatsapp avisándote, ¡es muy importante que aguardes este whatsapp
          antes de acercarte al local!. El retiro del pedido está a cargo del
          titular o de un tercero con autorización firmada por el titular y
          documento que acredite su identidad.
        </p>
        <br></br>
        <h6>Costo de envío</h6>
        <p>
          El valor de la entrega será indicado durante tu compra, antes de que
          el pedido sea finalizado. Este costo corre por cuenta de nuestros
          clientes, excepto en los casos en que Kosiuko esté haciendo una acción
          promocional.
        </p>
        <br></br>
        <h6>No recibí mi pedido y ya pasó el plazo de entrega. ¿Qué hago?</h6>
        <p>
          Esto es inusual. Por favor comunicate con nosotros vía whatsapp. No
          olvides tener a mano tu número de pedido.
        </p>
        <br></br>
        <h6>¿Puedo hacer el seguimiento de mi pedido?</h6>
        <p>
          Te enviaremos un whatsapp con un código (tracking number) y las
          instrucciones para que puedas hacer el seguimiento de tu pedido.
          También podés conocer el estado de tu envío desde aquí.
        </p>
        <br></br>
        <h6>¿Qué pasa si no hay nadie cuando traen mi pedido?</h6>
        <p>
          Si no hay nadie en el domicilio que nos indicaste, el correo regresará
          a las 48 horas. En caso de no encontrar a nadie, deberás dirigirte al
          centro de distribución asignado a tu pedido dentro de las 72 horas con
          tu DNI y el código que te enviamos (tracking number).
        </p>
        <br></br>
        <h6>¿Puede recibir el paquete otra persona?</h6>
        <p>
          Tu pedido puede ser recibido por cualquier persona mayor de 18 años
          que se encuentre en el domicilio registrado
        </p>
      </div>
    </div>
  );
}
export default ShippingInfo;
